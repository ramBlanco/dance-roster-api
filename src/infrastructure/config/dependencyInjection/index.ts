import { diContainer } from '@fastify/awilix'
import { asFunction, Lifetime } from 'awilix'
import { LocaleService } from '../../../application/services/localeService'
import { INJECTIONS } from './di'
import { ValidationService } from '../../../application/services/validationService'
import { eventDependency } from './eventDependency'
import { locationDependency } from './locationDependency'
import { personDependency } from './personDependency'
import { studentDependency } from './studentDependecy'
import { userDependency } from './userDependency'
import { tenantDependency } from './tenantDependency'
import { eventPersonDependency } from './eventPersonDependency'

export function registerDependencies(): void {
  diContainer.register({ [INJECTIONS.LOCALE_SERVICE]: asFunction(() => new LocaleService(), { lifetime: Lifetime.SCOPED }) })
  diContainer.register({
    [INJECTIONS.services.validationService]: asFunction(
      (
        {
          locationRepository,
          tenantRepository,
          personRepository,
          eventRepository
        }
      ) => new ValidationService(
        locationRepository,
        tenantRepository,
        personRepository,
        eventRepository
      ),
      { lifetime: Lifetime.SCOPED }
    )
  })

  eventDependency(diContainer)
  locationDependency(diContainer)
  personDependency(diContainer)
  studentDependency(diContainer)
  userDependency(diContainer)
  tenantDependency(diContainer)
  eventPersonDependency(diContainer)
}
