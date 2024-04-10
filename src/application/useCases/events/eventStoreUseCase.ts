import { StoreEventRequest } from '../../../domain/interfaces/requests/events/storeEventRequest'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventService } from '../../services/eventService'
import { Event } from '../../../infrastructure/database/postgresql/models/event.model'

export class EventStoreUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: StoreEventRequest): Promise<Event> {
    return await this.eventService.storeEvent(params)
  }
}
