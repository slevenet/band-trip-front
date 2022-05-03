import {Component, OnInit} from '@angular/core';
import {Marker} from "./model/marker";
import {EventTrip} from "./model/Event";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'google-maps';
  markers: Marker[] = [];
  eventTrips: EventTrip[] = [];

  ngOnInit(): void {
    this.markers.push({draggable: false, label: "", lng:10, lat:10})
    this.eventTrips.push({
      description: "Описание",
      endDate: new Date(),
      id: "",
      location: {label: "lable", formattedAddress: "Saratov", lat:10, lng:10},
      maxParticipants: 0,
      minParticipants: 0,
      name: "",
      participants: [],
      startDate: new Date(),
      status: "",
      type: ""
    })

    this.eventTrips.push({
      description: "Описание",
      endDate: new Date(),
      id: "",
      location: {label: "lable", formattedAddress: "Saratov", lat:10, lng:10},
      maxParticipants: 0,
      minParticipants: 0,
      name: "",
      participants: [],
      startDate: new Date(),
      status: "",
      type: ""
    })

    this.eventTrips.push({
      description: "Описание",
      endDate: new Date(),
      id: "",
      location: {label: "lable", formattedAddress: "Saratov", lat:10, lng:10},
      maxParticipants: 0,
      minParticipants: 0,
      name: "",
      participants: [],
      startDate: new Date(),
      status: "",
      type: ""
    })

    this.eventTrips.push({
      description: "Описание",
      endDate: new Date(),
      id: "",
      location: {label: "lable", formattedAddress: "Saratov", lat:10, lng:10},
      maxParticipants: 0,
      minParticipants: 0,
      name: "",
      participants: [],
      startDate: new Date(),
      status: "",
      type: ""
    })
  }


}
