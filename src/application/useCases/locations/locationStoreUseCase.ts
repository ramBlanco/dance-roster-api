import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { LocationService } from '../../../application/services/locationService'
import { Location } from '../../../infrastructure/database/postgresql/models/location.model'
import { StoreLocationRequest } from '../../../domain/interfaces/requests/locations/storeLocationRequest'
import { ValidationService } from '../../../application/services/validationService'

export class LocationStoreUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly locationService: LocationService
  ) {
    super()
  }

  override async handler(params: StoreLocationRequest): Promise<Location> {
    await this.validationService.validateTenant(params.tenantId)
    return await this.locationService.storeLocation(params)
  }
}
