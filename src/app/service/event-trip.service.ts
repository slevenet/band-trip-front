import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventTrip} from "../model/Event";

@Injectable({
  providedIn: 'root'
})
export class EventTripService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private userUrl = 'http://localhost:8080/api/trips/events';

  constructor(private httpClient: HttpClient) {}

  getAllGroup(): Observable<EventTrip[]> {
    return this.httpClient.get<EventTrip[]>(this.userUrl);
  }

  getEventById(id: number): Observable<EventTrip> {
    return this.httpClient.get<EventTrip>(this.userUrl + '/' + id)
  }

  createEvent(event: EventTrip): Observable<EventTrip> {
    return this.httpClient.post<EventTrip>(this.userUrl, event);
  }

  getAllEvents(): Observable<EventTrip[]> {
    return this.httpClient.get<EventTrip[]>(this.userUrl);
  }
}
