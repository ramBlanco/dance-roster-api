import { StoreEventRequest } from '../../../domain/interfaces/requests/events/storeEventRequest'
import { EventEntity } from '../../../domain/entities/eventEntity'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventService } from '../../services/eventService'

export class EventStoreUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: StoreEventRequest): Promise<EventEntity> {
    return await this.eventService.storeEvent()
  }
}
