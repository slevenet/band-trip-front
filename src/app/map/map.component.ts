import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Marker} from "../model/marker";
import {Loader} from "@googlemaps/js-api-loader";

function displayRoute(origin: string, destination: string, directionsService: google.maps.DirectionsService, directionsRenderer: google.maps.DirectionsRenderer) {
  directionsService
    .route({
      origin: origin,
      destination: destination,
      waypoints: [
        { location: "Adelaide, SA" },
        { location: "Broken Hill, NSW" },
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
  @Output() clickEvent : EventEmitter<MouseEvent> = new EventEmitter();
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  constructor() { }
  private map: google.maps.Map | undefined
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: '',
      libraries: ['places'],
    })

    loader.load().then(() => {

      const location = { lat: 51.233334, lng: 	6.783333 }

      this.map = new google.maps.Map(<HTMLElement>document.getElementById("map"), {
        center: location,
        zoom: 6,
        mapId: 'cd0d1eaf72262300'
      })

      this.markers.forEach(marker => new google.maps.Marker({position: {lat: marker.lat, lng: marker.lng}, map: this.map}));

      google.maps.event.addListener(this.map, 'dblclick', (event: { latLng: any; }) => {
        new google.maps.Marker({
          position: event.latLng,
          map: this.map,
        });
        // console.log('latlng', this.setPosition);
      })

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map,
        panel: document.getElementById("panel") as HTMLElement,
      });

      directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();
      });

      displayRoute(
        "Perth, WA",
        "Sydney, NSW",
        directionsService,
        directionsRenderer
      );

      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      this.map.addListener("bounds_changed", () => {
        // @ts-ignore
        searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
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
          markers.push(
            new google.maps.Marker({
              map: this.map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );

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


    })
  }

}
