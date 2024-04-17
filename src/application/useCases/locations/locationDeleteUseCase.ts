import { LocationService } from '../../services/locationService'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { Location } from '../../../infrastructure/database/postgresql/models/location.model'

export class LocationDeleteUseCase extends UseCaseBase {
  constructor(
    private readonly locationService: LocationService
  ) {
    super()
  }

  override async handler(params: {
    id: string, tenantId: string
  }): Promise<void> {
    await this.locationService.deleteLocation(params.id, params.tenantId)
  }
}