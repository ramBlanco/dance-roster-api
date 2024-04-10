import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../../application/handlers/queryFilterHandler'
import { EventService } from '../../../application/services/eventService'
import { IEventIndexRequest } from '../../../domain/interfaces/requests/events/indexEventRequest'
import { Event } from "../../../infrastructure/database/postgresql/models/event.model";

export class EventIndexUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: IEventIndexRequest): Promise<Event[]> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IEventIndexRequest>(params)
    const events = await this.eventService.getEventsByFilter(filters)
    return events
  }
}