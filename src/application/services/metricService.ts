import { IMetricSalesResponse } from "../../domain/interfaces/responses/metrics/metricSalesResponse";
import { EventPersonService } from "./eventPersonService";

export class MetricService {
  constructor(
    private readonly eventPersonService: EventPersonService
  ) { }
  /**
   * getMetricSales
   */
  public async getMetricSales(params: {
    tenantId: string,
    locationId: string
  }): Promise<IMetricSalesResponse[]> {
    return await this.eventPersonService.salesMetric(params.tenantId, params.locationId)
  }
}