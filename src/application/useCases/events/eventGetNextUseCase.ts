import { LocationService } from '../../services/locationService'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { Location } from '../../../infrastructure/database/postgresql/models/location.model'
import { EventService } from '../../services/eventService'
import { Event } from '../../../infrastructure/database/postgresql/models/event.model'

export class EventGetNextUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: {
    tenantId: string
  }): Promise<Event> {
    const nextEvent = await this.eventService.getNextEvent(params.tenantId)
    return nextEvent
  }
}