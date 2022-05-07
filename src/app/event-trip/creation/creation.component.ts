import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventTrip} from "../../model/Event";
import {Router} from "@angular/router";
import {EventTripService} from "../../service/event-trip.service";
import {Marker} from "../../model/marker";
import {MapPoint} from "../../model/MapPoint";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  firstFormGroup = {} as FormGroup;
  secondFormGroup = {} as FormGroup;
  routes: string[] = ["", ""];

  event = {} as EventTrip
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  markers: Marker[] = [];

  constructor(private eventService: EventTripService,
              private router: Router,
              private _formBuilder: FormBuilder) {
    this.event.routes = new Array<MapPoint>()
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  test2(pointsEvent: MapPoint) {
    let flag: boolean = false;
    for (let i = 0; i < this.event.routes.length; i++) {
      if (this.event.routes[i].type === pointsEvent.type) {
        this.event.routes[i] = pointsEvent
        flag = true;
      }
    }
    if (pointsEvent.type == "start-route") {
      this.routes[0] = pointsEvent.label
    }
    if (pointsEvent.type == "end-route") {
      this.routes[this.routes.length - 1] = pointsEvent.label
    }
    if (!flag) this.event.routes.push(pointsEvent);
  }

  createEvent() {
    this.event.type = 'LOCAL'
    this.event.participants = []
    this.event.startDate = this.range.value.start
    this.event.endDate = this.range.value.end
    console.log(this.event)
    this.eventService.createEvent(this.event)
      .subscribe(() => this.router.navigate(["/"]));
  }


}
