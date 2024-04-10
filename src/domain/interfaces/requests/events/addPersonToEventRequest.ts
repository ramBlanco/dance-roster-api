import { PersonEntity } from "../../../../domain/entities/personEntity";

export type IAddPersonToEventRequest = {
  persons: PersonEntity[],
  eventId: string
}