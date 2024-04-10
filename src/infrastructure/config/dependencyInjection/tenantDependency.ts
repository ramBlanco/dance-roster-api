import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { TenantRepository } from "../../../infrastructure/repositories/tenantRepository";

export function tenantDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.repositories.tenantRepository]: asFunction(
      () => new TenantRepository(),
      { lifetime: Lifetime.SINGLETON }
    )
  })
}
