import { TestBed } from '@angular/core/testing';

import { EventTripService } from './event-trip.service';

describe('EventTripService', () => {
  let service: EventTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
