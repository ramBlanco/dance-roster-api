import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { EventService } from "../../../application/services/eventService";
import { EventsRepository } from "../../../infrastructure/repositories/eventRepository";
import { EventIndexUseCase } from "../../../application/useCases/events/eventIndexUseCase";
import { EventStoreUseCase } from "../../../application/useCases/events/eventStoreUseCase";
import { EventViewUseCase } from "../../../application/useCases/events/eventViewUseCase ";
import { AddPersonToEventUseCase } from "../../../application/useCases/events/addPersonToEventUseCase";

export function eventDependency(container: AwilixContainer): void {

  container.register({
    [INJECTIONS.services.eventService]: asFunction(
      ({ eventRepository }) => new EventService(eventRepository),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.repositories.eventRepository]: asFunction(
      () => new EventsRepository(),
      { lifetime: Lifetime.SINGLETON }
    )
  })

  container.register({
    [INJECTIONS.useCases.events.indexUseCase]: asFunction(
      ({ eventService }) => new EventIndexUseCase(eventService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.events.storeUseCase]: asFunction(
      ({ validationService, eventService }) => new EventStoreUseCase(validationService, eventService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.events.viewUseCase]: asFunction(
      ({ eventService }) => new EventViewUseCase(eventService),
      { lifetime: Lifetime.SCOPED }
    )
  })
  container.register({
    [INJECTIONS.useCases.events.addPersonToEventUseCase]: asFunction(
      ({ validationService, personService, eventPersonService }) => new AddPersonToEventUseCase(validationService, personService, eventPersonService),
      { lifetime: Lifetime.SCOPED }
    )
  })
}