import { StoreEventRequest } from '../../../domain/interfaces/requests/events/storeEventRequest'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventService } from '../../services/eventService'
import { Event } from '../../../infrastructure/database/postgresql/models/event.model'
import { ValidationService } from '../../../application/services/validationService'

export class EventStoreUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: StoreEventRequest): Promise<Event> {
    await this.validationService.validateTenant(params.tenantId)
    await this.validationService.validateLocation(params.locationId)
    return await this.eventService.storeEvent(params)
  }
}
