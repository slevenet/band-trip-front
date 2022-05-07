import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Marker} from "../model/marker";
import {Loader} from "@googlemaps/js-api-loader";
import {MapService} from "../service/map.service";
import {MapPoint} from "../model/MapPoint";

function displayRoute(origin: string, destination: string, directionsService: google.maps.DirectionsService, directionsRenderer: google.maps.DirectionsRenderer) {
  directionsService
    .route({
      origin: origin,
      destination: destination,
      waypoints: [
        {location: {placeId: "ChIJrRUPd-ynNCoR_hARPl7tyzA"}},
        {location: "Adelaide, SA"},
        {location: "Broken Hill, NSW"},
      ],
      travelMode: google.maps.TravelMode.WALKING,
      avoidTolls: true,
    })
    .then((result: google.maps.DirectionsResult) => {
      directionsRenderer.setDirections(result);
    })
    .catch((e) => {
      alert("Could not display directions due to: " + e);
    });
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() markers: Marker[] = [];
  @Input() groups: Event[] = []
  @Output() clickEvent: EventEmitter<google.maps.Marker> = new EventEmitter();
  @Output() pointsEvent: EventEmitter<MapPoint> = new EventEmitter();
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor(public mapService: MapService) {
  }

  private map: google.maps.Map | undefined

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: '',
      libraries: ['places'],
    })

    loader.load().then(() => {

      const location = {lat: 51.233334, lng: 6.783333}

      this.map = new google.maps.Map(<HTMLElement>document.getElementById("map"), {
        center: location,
        zoom: 6,
        mapId: 'cd0d1eaf72262300'
      })

      this.markers.forEach(marker => new google.maps.Marker({
        position: {lat: marker.lat, lng: marker.lng},
        map: this.map
      }));

      google.maps.event.addListener(this.map, 'dblclick', (event: { latLng: any; }) => {
        new google.maps.Marker({
          position: event.latLng,
          draggable: true,
          map: this.map,
        });
      })

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map,
        panel: document.getElementById("panel") as HTMLElement,
      });

      directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
        //       this.mapService.placeIdToCoordinates("ChIJrRUPd-ynNCoR_hARPl7tyzA")?.then(result => console.log('mapService',result.results[0].geometry.location.toJSON()));
      });

      displayRoute(
        "Perth, WA",
        "Sydney, NSW",
        directionsService,
        directionsRenderer
      );

      this.autocompleate(this.map, document.getElementById("start-route") as HTMLInputElement)
      this.autocompleate(this.map, document.getElementById("end-route") as HTMLInputElement)


    })
  }

  autocompleate(map: google.maps.Map, input: HTMLInputElement): google.maps.Marker {

    const searchBox = new google.maps.places.SearchBox(input);
    let marker = {} as google.maps.Marker
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      // @ts-ignore
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      // @ts-ignore
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      // @ts-ignore
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        marker = new google.maps.Marker({
          map: map,
          icon,
          draggable: true,
          title: place.name,
          position: place.geometry.location,
        });


        marker.addListener("dragend",
          () => {
            // @ts-ignore
            this.mapService.coordinatesToAddress(marker.getPosition()?.lat(), marker.getPosition()?.lng()).then((result) =>

              this.pointsEvent.emit({
                // @ts-ignore
                lng: marker.getPosition()?.lng(),
                // @ts-ignore
                lat: marker.getPosition()?.lat(),
                order: 0,
                type: input.id,
                label: result
              }))
          }
        )
// @ts-ignore
        this.mapService.coordinatesToAddress(marker.getPosition()?.lat(), marker.getPosition()?.lng()).then((result) =>
          this.pointsEvent.emit({
            // @ts-ignore
            lng: marker.getPosition()?.lng(),
            // @ts-ignore
            lat: marker.getPosition()?.lat(),
            order: 0,
            type: input.id,
            label: result
          }))

        markers.push(marker)


        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      // @ts-ignore
      this.map.fitBounds(bounds);
    });
    return marker;
  }


}
