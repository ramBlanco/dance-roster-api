import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventPerson } from '../../../infrastructure/database/postgresql/models/eventPerson.model'
import { ValidationService } from '../../services/validationService'
import { EventPersonService } from '../../../application/services/eventPersonService'
import { QueryFilterHandler } from '../../../application/handlers/queryFilterHandler'
import { IEventIndexRequest } from '../../../domain/interfaces/requests/events/indexEventRequest'
import { IEventPersonIndexRequest } from '../../../domain/interfaces/requests/events/getPersonFromEventRequest'

export class GetPersonFromEventUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly eventPersonService: EventPersonService
  ) {
    super()
  }

  override async handler(params: IEventPersonIndexRequest): Promise<EventPerson[]> {
    await this.validationService.validateEvent(params.eventId)

    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IEventPersonIndexRequest>(params)

    filters.where = { ...filters.where, eventId: params.eventId }
    const eventPersons = await this.eventPersonService.getEventPersonsByFilter(filters)
    return eventPersons
  }
}
