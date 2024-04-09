import { EventsRepository } from "../../infrastructure/repositories/eventRepository";
import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { EventEntity } from "../../domain/entities/eventEntity";

export class EventService {
  constructor(private readonly eventRepository: EventsRepository) { }

  async getEventsByFilter(filters: IQueryFilterHandlerResponse): Promise<[]> {
    return await this.eventRepository.getEvents()
  }

  async storeEvent(): Promise<EventEntity> {
    return await this.eventRepository.store()
  }

  async viewEvent(id: string): Promise<EventEntity> {
    return await this.eventRepository.view(id)
  }
}