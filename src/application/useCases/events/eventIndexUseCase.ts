import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../../application/handlers/queryFilterHandler'
import { EventService } from '../../../application/services/eventService'
import { IEventIndexRequest } from '../../../domain/interfaces/requests/events/indexEventRequest'
import { Event } from "../../../infrastructure/database/postgresql/models/event.model";
import { IPaginationResponseRepository } from '../../../domain/interfaces/paginationResponseRepositoryInterface';
import { SignParamsWithJWT } from '../../../domain/interfaces/jwtInterfaces';

export class EventIndexUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: {
    filters: IEventIndexRequest,
    userSession: SignParamsWithJWT
  }): Promise<IPaginationResponseRepository<Event>> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IEventIndexRequest>(params.filters)
    filters.where = { ...filters.where, tenantId: params.userSession.tenantId }
    const events = await this.eventService.getEventsByFilter(filters)
    return events
  }
}