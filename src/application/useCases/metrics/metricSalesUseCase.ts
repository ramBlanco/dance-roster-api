import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { ValidationService } from '../../../application/services/validationService'
import { MetricService } from '../../../application/services/metricService'

export class MetricSalesUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly metricService: MetricService
  ) {
    super()
  }

  override async handler(params: {
    tenantId: string,
    locationId: string
  }): Promise<any[]> {
    await this.validationService.validateTenant(params.tenantId)
    await this.validationService.validateLocation(params.locationId)

    return this.metricService.getMetricSales(params)
  }
}