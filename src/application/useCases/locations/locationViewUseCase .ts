import { LocationService } from '../../../application/services/locationService'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { Location } from '../../../infrastructure/database/postgresql/models/location.model'

export class LocationViewUseCase extends UseCaseBase {
  constructor(
    private readonly locationService: LocationService
  ) {
    super()
  }

  override async handler(id: string): Promise<Location> {
    return await this.locationService.viewLocation(id)
  }
}