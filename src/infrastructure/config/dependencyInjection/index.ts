import { diContainer } from '@fastify/awilix'
import { asClass, asFunction, Lifetime } from 'awilix'
import { LocaleService } from '../../../application/services/localeService'
import { UserService } from '../../../application/services/userService'
import { LoginUseCase } from '../../../application/useCases/auth/loginUseCase'
import { UserRepository } from '../../repositories/userRepository'
import { INJECTIONS } from './di'
import { EventIndexUseCase } from '../../../application/useCases/events/eventIndexUseCase'
import { EventsRepository } from '../../../infrastructure/repositories/eventRepository'
import { EventService } from '../../../application/services/eventService'
import { StudentService } from '../../../application/services/studentService'
import { StudentsRepository } from '../../../infrastructure/repositories/studentRepository'
import { StudentIndexUseCase } from '../../../application/useCases/students/studentIndexUseCase'
import { EventStoreUseCase } from '../../../application/useCases/events/eventStoreUseCase'
import { EventViewUseCase } from '..//../../application/useCases/events/eventViewUseCase '
import { LocationIndexUseCase } from '../../../application/useCases/locations/locationIndexUseCase'
import { LocationStoreUseCase } from '../../../application/useCases/locations/locationStoreUseCase'
import { LocationViewUseCase } from '../../../application/useCases/locations/locationViewUseCase '
import { LocationsRepository } from '../../../infrastructure/repositories/locationRepository'
import { LocationService } from '../../../application/services/locationService'

export function registerDependencies(): void {

  diContainer.register({ [INJECTIONS.LOCALE_SERVICE]: asFunction(() => new LocaleService(), { lifetime: Lifetime.SCOPED }) })

  // services
  diContainer.register({ 
    [INJECTIONS.USER_SERVICE]: asFunction(
      () => new UserService(), 
      { lifetime: Lifetime.SCOPED }
    ) 
  })
  diContainer.register({ 
    [INJECTIONS.services.eventService]: asFunction(
      ({ eventRepository }) => new EventService(eventRepository), 
      { lifetime: Lifetime.SCOPED }
    ) 
  })
  diContainer.register({
    [INJECTIONS.services.studentService]: asFunction(
      ({ studentRepository }) => new StudentService(studentRepository),
      { lifetime: Lifetime.SCOPED }
    ) 
  })
  diContainer.register({
    [INJECTIONS.services.studentService]: asFunction(
      ({ locationRepository }) => new LocationService(locationRepository),
      { lifetime: Lifetime.SCOPED }
    ) 
  })
  // repositories
  diContainer.register({ 
    [INJECTIONS.USER_REPOSITORY]: asFunction(
      () => new UserRepository(), 
      { lifetime: Lifetime.SINGLETON }
    ) 
  })
  diContainer.register({ 
    [INJECTIONS.repositories.eventRepository]: asFunction(
      () => new EventsRepository(), 
      { lifetime: Lifetime.SINGLETON }
    ) 
  })
  diContainer.register({ 
    [INJECTIONS.repositories.studentRepository]: asFunction(
      () => new StudentsRepository(), 
      { lifetime: Lifetime.SINGLETON }
    ) 
  })

  diContainer.register({ 
    [INJECTIONS.repositories.locationRepository]: asFunction(
      () => new LocationsRepository(), 
      { lifetime: Lifetime.SINGLETON }
    ) 
  })

  // ----------------------------------------------------- use case
  // ###### INIT auth use cases
  diContainer.register({
    [INJECTIONS.LOGIN_USE_CASE]: asFunction(
      () => new LoginUseCase(), 
      { lifetime: Lifetime.SCOPED }
    ) 
  })
  // ###### FINISH auth use cases
  // ###### INIT location use cases

  diContainer.register({
    [INJECTIONS.useCases.locations.indexUseCase]: asFunction(
      ({ locationService }) => new LocationIndexUseCase(locationService), 
      { lifetime: Lifetime.SCOPED }
    )
  })
  diContainer.register({
    [INJECTIONS.useCases.locations.storeUseCase]: asFunction(
      ({ locationService }) => new LocationStoreUseCase(locationService), 
      { lifetime: Lifetime.SCOPED }
    )
  })
  diContainer.register({
    [INJECTIONS.useCases.locations.viewUseCase]: asFunction(
      ({ locationService }) => new LocationViewUseCase(locationService), 
      { lifetime: Lifetime.SCOPED }
    )
  })

  // ###### FINISH location use cases
  // ###### INIT events use cases

  diContainer.register({
    [INJECTIONS.useCases.events.indexUseCase]: asFunction(
      ({ eventService }) => new EventIndexUseCase(eventService), 
      { lifetime: Lifetime.SCOPED }
    )
  })
  diContainer.register({
    [INJECTIONS.useCases.events.storeUseCase]: asFunction(
      ({ eventService }) => new EventStoreUseCase(eventService), 
      { lifetime: Lifetime.SCOPED }
    )
  })
  diContainer.register({
    [INJECTIONS.useCases.events.viewUseCase]: asFunction(
      ({ eventService }) => new EventViewUseCase(eventService), 
      { lifetime: Lifetime.SCOPED }
    )
  })

  // ###### FINISH events use cases
  // ###### INIT students use cases

  diContainer.register({
    [INJECTIONS.useCases.students.indexUseCase]: asFunction(
      ({ studentService }) => new StudentIndexUseCase(studentService), 
      { lifetime: Lifetime.SCOPED }
    )
  })
}
