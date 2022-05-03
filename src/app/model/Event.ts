import {EventLocation} from "./EventLocation";
import {Participant} from "./Participant";

export interface EventTrip {
  id: string
  name: string
  description: string
  status: string
  type: string
  startDate: Date
  endDate: Date
  maxParticipants: number
  minParticipants: number
  participants: Participant[]
  location: EventLocation

}
