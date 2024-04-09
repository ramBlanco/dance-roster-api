export const INJECTIONS = {
  USER_REPOSITORY: 'userRepository',
  USER_SERVICE: 'userService',
  LOCALE_SERVICE: 'localeService',
  LOGIN_USE_CASE: 'loginUseCase',

  repositories: {
    eventRepository: 'eventRepository',
    studentRepository: 'studentRepository'
  },
  services: {
    eventService: 'eventService',
    studentService: 'studentService'
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
  }
}
