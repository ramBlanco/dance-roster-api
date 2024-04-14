import { EventPerson } from "../../infrastructure/database/postgresql/models/eventPerson.model";

export type EventPersonEntity = Pick<EventPerson, "tenantId" | "locationId" | "eventId" | "personId">