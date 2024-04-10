import { Event } from "../../infrastructure/database/postgresql/models/event.model";
export type EventEntity = Pick<Event, "date" | "tenantId" | "locationId" | "title">