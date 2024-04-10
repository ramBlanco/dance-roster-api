export const INJECTIONS = {
  USER_REPOSITORY: 'userRepository',
  USER_SERVICE: 'userService',
  LOCALE_SERVICE: 'localeService',
  LOGIN_USE_CASE: 'loginUseCase',

  repositories: {
    eventRepository: 'eventRepository',
    studentRepository: 'studentRepository',
    locationRepository: 'locationRepository',
    tenantRepository: 'tenantRepository',
    personRepository: 'personRepository',
    eventPersonRepository: 'eventPersonRepository',
  },
  services: {
    eventService: 'eventService',
    studentService: 'studentService',
    locationService: 'locationService',
    validationService: 'validationService',
    personService: 'personService',
    eventPersonService: 'eventPersonService',
  },
  useCases: {
    events: {
      indexUseCase: 'eventsIndexUseCase',
      storeUseCase: 'eventStoreUseCase',
      viewUseCase: 'eventViewUseCase',
      addPersonToEventUseCase: 'addPersonToEventUseCase',
    },
    students: {
      indexUseCase: 'studentIndexUseCase'
    },
    locations: {
      indexUseCase: 'locationIndexUseCase',
      storeUseCase: 'locationStoreUseCase',
      viewUseCase: 'locationViewUseCase',
    },
    persons: {
      indexUseCase: 'personIndexUseCase',
      storeUseCase: 'personStoreUseCase',
      viewUseCase: 'personViewUseCase',
    },
  }
}
