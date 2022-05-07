import {Participant} from "./Participant";
import {MapPoint} from "./MapPoint";

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
  routes: MapPoint[]

}
