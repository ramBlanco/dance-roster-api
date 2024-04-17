import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { QueryFilterHandler } from '../../handlers/queryFilterHandler'
import { IEventIndexRequest } from '../../../domain/interfaces/requests/events/indexEventRequest'
import { LocationService } from '../../../application/services/locationService';
import { Location } from '../../../infrastructure/database/postgresql/models/location.model';

export class LocationIndexUseCase extends UseCaseBase {
  constructor(
    private readonly locationService: LocationService
  ) {
    super()
  }

  override async handler(params: {
    query: IEventIndexRequest,
    tenantId: string
  }): Promise<Location[]> {
    const queryFilterHandler = new QueryFilterHandler()
    const filters = queryFilterHandler.getParams<IEventIndexRequest>(params.query)
    filters.where = { ...filters.where, tenantId: params.tenantId }
    const locations = await this.locationService.getAllByFilter(filters)
    return locations
  }
}