import { EventsRepository } from "../../infrastructure/repositories/eventRepository";
import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { EventEntity } from "../../domain/entities/eventEntity";
import { Event } from "../../infrastructure/database/postgresql/models/event.model";
import { IPaginationResponseRepository } from "../../domain/interfaces/paginationResponseRepositoryInterface";

export class EventService {
  constructor(private readonly eventRepository: EventsRepository) { }

  async getEventsByFilter(filters: IQueryFilterHandlerResponse): Promise<IPaginationResponseRepository<Event>> {
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
    const events = await this.eventRepository.viewBySlug(id)
    const [event] = events.rows
    return event
  }

  async deleteEvent(id: string, tenantId: string): Promise<void> {
    await this.eventRepository.delete(id, tenantId)
  }
}