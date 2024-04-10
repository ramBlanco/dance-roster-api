import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { EventPerson } from '../../../infrastructure/database/postgresql/models/eventPerson.model'
import { ValidationService } from '../../services/validationService'
import { PersonService } from '../../../application/services/personService'
import { IAddPersonToEventRequest } from '../../../domain/interfaces/requests/events/addPersonToEventRequest'
import { Event } from '../../../infrastructure/database/postgresql/models/event.model'
import { EventPersonService } from '~src/application/services/eventPersonService'
import { EventPersonEntity } from '~src/domain/entities/eventPersonEntity'
import { Person } from '../../../infrastructure/database/postgresql/models/person.model'

export class AddPersonToEventUseCase extends UseCaseBase {
  constructor(
    private readonly validationService: ValidationService,
    private readonly personService: PersonService,
    private readonly eventPersonService: EventPersonService
  ) {
    super()
  }

  private buildEventPersons(persons: Person[], event: Event): EventPersonEntity[] {
    return persons.map((person) => {
      const eventPerson: EventPersonEntity = {
        eventId: event.id,
        locationId: event.locationId,
        personId: person.id,
        tenantId: event.tenantId
      }
      return eventPerson
    })
  }

  override async handler(params: IAddPersonToEventRequest): Promise<EventPerson[]> {
    const event = await this.validationService.validateEvent(params.eventId) as Event
    const persons = await this.personService.findByEmailOrInsert(params.persons)

    const eventPersonsBuilded: EventPersonEntity[] = this.buildEventPersons(persons, event)
    const eventPersons = await this.eventPersonService.store(eventPersonsBuilded)
    return eventPersons
  }
}
