export const INJECTIONS = {
  USER_REPOSITORY: 'userRepository',
  USER_SERVICE: 'userService',
  LOCALE_SERVICE: 'localeService',
  LOGIN_USE_CASE: 'loginUseCase',
  REFRESH_TOKEN_USE_CASE: 'refreshTokenUseCase',

  adapters: {
    databaseAdapter: 'databaseAdapter'
  },
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
      updateUseCase: 'updateViewUseCase',
      deleteEventUseCase: 'deleteEventUseCase',
      addPersonToEventUseCase: 'addPersonToEventUseCase',
      getPersonFromEventUseCase: 'getPersonFromEventUseCase',
      deletePersonFromEventUseCase: 'deletePersonFromEventUseCase',
      eventGetNextUseCase: 'eventGetNextUseCase',
    },
    students: {
      indexUseCase: 'studentIndexUseCase'
    },
    locations: {
      indexUseCase: 'locationIndexUseCase',
      storeUseCase: 'locationStoreUseCase',
      viewUseCase: 'locationViewUseCase',
      deleteUseCase: 'locationDeleteViewCase'
    },
    persons: {
      indexUseCase: 'personIndexUseCase',
      storeUseCase: 'personStoreUseCase',
      viewUseCase: 'personViewUseCase',
      getBirthdaysUseCase: 'getBirthdaysUseCase'
    },
  }
}
