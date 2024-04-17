import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { LocationService } from "../../../application/services/locationService";
import { LocationsRepository } from "../../../infrastructure/repositories/locationRepository";
import { LocationIndexUseCase } from "../../../application/useCases/locations/locationIndexUseCase";
import { LocationStoreUseCase } from "../../../application/useCases/locations/locationStoreUseCase";
import { LocationViewUseCase } from "../../../application/useCases/locations/locationViewUseCase ";
import { LocationDeleteUseCase } from "../../../application/useCases/locations/locationDeleteUseCase";

export function locationDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.services.locationService]: asFunction(
      ({ locationRepository }) => new LocationService(locationRepository),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.repositories.locationRepository]: asFunction(
      () => new LocationsRepository(),
      { lifetime: Lifetime.SINGLETON }
    )
  })

  container.register({
    [INJECTIONS.useCases.locations.indexUseCase]: asFunction(
      ({ locationService }) => new LocationIndexUseCase(locationService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.locations.storeUseCase]: asFunction(
      ({ validationService, locationService }) => new LocationStoreUseCase(validationService, locationService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.locations.viewUseCase]: asFunction(
      ({ locationService }) => new LocationViewUseCase(locationService),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.useCases.locations.deleteUseCase]: asFunction(
      ({ locationService }) => new LocationDeleteUseCase(locationService),
      { lifetime: Lifetime.SCOPED }
    )
  })
}
