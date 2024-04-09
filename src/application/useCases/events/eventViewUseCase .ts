import { EventEntity } from '../../../domain/entities/eventEntity'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventService } from '../../services/eventService'

export class EventViewUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(id: string): Promise<EventEntity> {
    return await this.eventService.viewEvent(id)
  }
}