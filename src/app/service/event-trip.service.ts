import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventTripService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private userUrl = 'http://localhost:8081/events';

  constructor(private httpClient: HttpClient) {}

  getAllGroup(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.userUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(this.userUrl + '/' + id)
  }

  createEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(this.userUrl, event);
  }
}
