export const INJECTIONS = {
  USER_REPOSITORY: 'userRepository',
  USER_SERVICE: 'userService',
  LOCALE_SERVICE: 'localeService',
  LOGIN_USE_CASE: 'loginUseCase',

  repositories: {
    eventRepository: 'eventRepository',
    studentRepository: 'studentRepository',
    locationRepository: 'locationRepository',
  },
  services: {
    eventService: 'eventService',
    studentService: 'studentService',
    locationService: 'locationService',
  },
  useCases: {
    events: {
      indexUseCase: 'eventsIndexUseCase',
      storeUseCase: 'eventStoreUseCase',
      viewUseCase: 'eventViewUseCase',
    },
    students: {
      indexUseCase: 'studentIndexUseCase'
    },
    locations: {
      indexUseCase: 'locationIndexUseCase',
      storeUseCase: 'locationStoreUseCase',
      viewUseCase: 'locationViewUseCase',
    },
  }
}
