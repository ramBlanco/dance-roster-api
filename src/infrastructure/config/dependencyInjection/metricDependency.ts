import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { TenantRepository } from "../../repositories/tenantRepository";
import { MetricSalesUseCase } from "../../../application/useCases/metrics/metricSalesUseCase";
import { MetricService } from "../../../application/services/metricService";

export function metricDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.services.metricService]: asFunction(
      ({ eventPersonService }) => new MetricService(eventPersonService),
      { lifetime: Lifetime.SINGLETON }
    )
  })
  
  container.register({
    [INJECTIONS.useCases.metric.metricSalesUseCase]: asFunction(
      ({ validationService, metricService }) => new MetricSalesUseCase(validationService, metricService),
      { lifetime: Lifetime.SINGLETON }
    )
  })
}
