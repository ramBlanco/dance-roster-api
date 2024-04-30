import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { PersonService } from "../../../application/services/personService";
import { PersonRepository } from "../../../infrastructure/repositories/personRepository";
import { PersonIndexUseCase } from "../../../application/useCases/persons/personIndexUseCase";
import { PersonStoreUseCase } from "../../../application/useCases/persons/personStoreUseCase";
import { PersonViewUseCase } from "../../../application/useCases/persons/personViewUseCase ";
import { GetBirthdaysUseCase } from "../../../application/useCases/persons/getBirthdaysUseCase";

export function personDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.services.personService]: asFunction(
      ({ personRepository, eventRepository, eventPersonRepository }) => new PersonService(personRepository, eventRepository, eventPersonRepository),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.repositories.personRepository]: asFunction(
      () => new PersonRepository(),
      { lifetime: Lifetime.SINGLETON }
    )
  })

  container.register({
    [INJECTIONS.useCases.persons.indexUseCase]: asFunction(
      ({ personService }) => new PersonIndexUseCase(personService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.persons.storeUseCase]: asFunction(
      ({ validationService, personService }) => new PersonStoreUseCase(validationService, personService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.persons.viewUseCase]: asFunction(
      ({ personService }) => new PersonViewUseCase(personService),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.useCases.persons.getBirthdaysUseCase]: asFunction(
      ({ personService }) => new GetBirthdaysUseCase(personService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  
}