import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../../application/handlers/queryFilterHandler'
import { EventService } from '../../../application/services/eventService'
import { IEventIndexRequest } from '../../../domain/interfaces/requests/events/indexEventRequest'

export class EventIndexUseCase extends UseCaseBase {
  constructor(
    private readonly eventService: EventService
  ) {
    super()
  }

  override async handler(params: IEventIndexRequest): Promise<[]> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IEventIndexRequest>(params)

    const collections = await this.eventService.getEventsByFilter(filters)
    return collections
  }
}