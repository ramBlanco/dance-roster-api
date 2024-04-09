import { diContainer } from '@fastify/awilix'
import { asClass, Lifetime } from 'awilix'
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

export function registerDependencies(): void {

  diContainer.register({ [INJECTIONS.LOCALE_SERVICE]: asClass(LocaleService, { lifetime: Lifetime.SCOPED }) })

  // services
  diContainer.register({ [INJECTIONS.USER_SERVICE]: asClass(UserService, { lifetime: Lifetime.SCOPED }) })
  diContainer.register({ [INJECTIONS.services.eventService]: asClass(EventService, { lifetime: Lifetime.SCOPED }) })
  diContainer.register({ [INJECTIONS.services.studentService]: asClass(StudentService, { lifetime: Lifetime.SCOPED }) })
  // repositories
  diContainer.register({ [INJECTIONS.USER_REPOSITORY]: asClass(UserRepository, { lifetime: Lifetime.SINGLETON }) })
  diContainer.register({ [INJECTIONS.repositories.eventRepository]: asClass(EventsRepository, { lifetime: Lifetime.SINGLETON }) })
  diContainer.register({ [INJECTIONS.repositories.studentRepository]: asClass(StudentsRepository, { lifetime: Lifetime.SINGLETON }) })
  // use case
  diContainer.register({ [INJECTIONS.LOGIN_USE_CASE]: asClass(LoginUseCase, { lifetime: Lifetime.SCOPED }) })
  diContainer.register({ [INJECTIONS.useCases.events.indexUseCase]: asClass(EventIndexUseCase, { lifetime: Lifetime.SCOPED }) })
  diContainer.register({ [INJECTIONS.useCases.events.storeUseCase]: asClass(EventStoreUseCase, { lifetime: Lifetime.SCOPED }) })
  diContainer.register({ [INJECTIONS.useCases.events.viewUseCase]: asClass(EventViewUseCase, { lifetime: Lifetime.SCOPED }) })

  diContainer.register({ [INJECTIONS.useCases.students.indexUseCase]: asClass(StudentIndexUseCase, { lifetime: Lifetime.SCOPED }) })
}
