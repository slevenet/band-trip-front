import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private geocoder: google.maps.Geocoder | undefined;

  constructor() {
  }

  placeIdToCoordinates(placeId: string) {
    this.geocoder = new google.maps.Geocoder()
    return this.geocoder?.geocode({placeId: placeId}).then(result => result.results[0].geometry.location)
  }

  coordinatesToAddress(lat: number, lng: number) {
    this.geocoder = new google.maps.Geocoder()
    return this.geocoder?.geocode({location: {lat: lat, lng: lng}}).then(result => result.results[0].formatted_address)
  }
}
