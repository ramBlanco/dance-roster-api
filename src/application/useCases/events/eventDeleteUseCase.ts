import { LocationService } from '../../services/locationService'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { Location } from '../../../infrastructure/database/postgresql/models/location.model'
import { EventService } from '../../../application/services/eventService'

export class EventDeleteUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: {
    id: string, tenantId: string
  }): Promise<void> {
    await this.eventService.deleteEvent(params.id, params.tenantId)
  }
}