import { StoreEventRequest } from '../../../domain/interfaces/requests/events/storeEventRequest'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventService } from '../../services/eventService'
import { Event } from '../../../infrastructure/database/postgresql/models/event.model'
import { ValidationService } from '../../services/validationService'
import { UpdateEventRequest } from '../../../domain/interfaces/requests/events/updateEventRequest'

export class EventUpdateUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: {
    bodyRequest: UpdateEventRequest,
    eventId: string,
    tenantId: string
  }): Promise<Event> {
    await this.validationService.validateTenant(params.tenantId)
    await this.validationService.validateLocation(params.bodyRequest.locationId)

    params.bodyRequest.tenantId = params.tenantId
    params.bodyRequest.id = params.eventId
    return await this.eventService.updateEvent(params.bodyRequest)
  }
}
