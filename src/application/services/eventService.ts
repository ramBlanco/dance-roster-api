import { EventsRepository } from "../../infrastructure/repositories/eventRepository";
import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { EventEntity } from "../../domain/entities/eventEntity";
import { Event } from "../../infrastructure/database/postgresql/models/event.model";

export class EventService {
  constructor(private readonly eventRepository: EventsRepository) { }

  async getEventsByFilter(filters: IQueryFilterHandlerResponse): Promise<Event[]> {
    return await this.eventRepository.getEvents({
      where: filters.where,
      offset: filters.pagination.offset,
      limit: filters.pagination.pageSize
    })
  }

  async storeEvent(eventBody: EventEntity): Promise<Event> {
    return await this.eventRepository.store({
      date: eventBody.date,
      title: eventBody.title,
      tenantId: eventBody.tenantId,
      locationId: eventBody.locationId,
    })
  }

  async viewEvent(id: string): Promise<EventEntity> {
    return await this.eventRepository.view(id)
  }
}