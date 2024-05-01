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
import { authDependency } from './authDependency'
import { metricDependency } from './metricDependency'

export function registerDependencies(): void {
  try {
    
    // diContainer.register({ [INJECTIONS.LOCALE_SERVICE]: asFunction(() => new LocaleService(), { lifetime: Lifetime.SCOPED }) })
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
    authDependency(diContainer)
    eventDependency(diContainer)
    locationDependency(diContainer)
    personDependency(diContainer)
    studentDependency(diContainer)
    userDependency(diContainer)
    tenantDependency(diContainer)
    eventPersonDependency(diContainer)
    metricDependency(diContainer)
  } catch (error) {
    console.error(error)
  }
}
