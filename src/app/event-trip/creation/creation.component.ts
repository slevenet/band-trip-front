import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventLocation} from "../../model/EventLocation";
import {EventTrip} from "../../model/Event";
import {Router} from "@angular/router";
import {EventTripService} from "../../service/event-trip.service";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  firstFormGroup = {} as FormGroup;
  secondFormGroup = {} as FormGroup;

  event = {} as EventTrip
  events: EventTrip[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  markers: any;

  constructor(private eventService: EventTripService,
              private router: Router,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let location = {} as EventLocation;
    this.event.location = location;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  createEvent() {
    this.event.type = 'LOCAL'
    this.event.participants = []
    this.event.startDate = this.range.value.start
    this.event.endDate = this.range.value.end
    this.eventService.createEvent(this.event);
    //  .subscribe(() => this.router.navigate(["groups"]));
  }
  onAClicked(event: any) {
    let location = {} as EventLocation;
    let eventLocation = {} as EventTrip;

    this.event.location.lng = event.coords.lng;
    this.event.location.lat = event.coords.lat;
   // this.mapService.getAddress(event.coords.lat, event.coords.lng).then(address => this.event.location.formattedAddress = address)
    location.lat = event.coords.lat;
    location.lng = event.coords.lng;
    eventLocation.location = location;
    this.events.push(eventLocation);
  }

}
