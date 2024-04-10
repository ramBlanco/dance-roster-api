import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { EventPersonRepository } from "../../../infrastructure/repositories/eventPersonRepository";
import { EventPersonService } from "../../../application/services/eventPersonService";

export function eventPersonDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.services.eventPersonService]: asFunction(
      ({eventPersonRepository}) => new EventPersonService(eventPersonRepository),
      { lifetime: Lifetime.SCOPED }
    )
  })
  
  container.register({
    [INJECTIONS.repositories.eventPersonRepository]: asFunction(
      () => new EventPersonRepository(),
      { lifetime: Lifetime.SCOPED }
    )
  })
}