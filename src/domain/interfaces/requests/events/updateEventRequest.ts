import { EventEntity } from "../../../entities/eventEntity";

export type UpdateEventRequest = EventEntity & {
  id?: string
  slug?: string
}