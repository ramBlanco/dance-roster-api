import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { PersonEntity } from "../../domain/entities/personEntity";
import { PersonRepository } from "../../infrastructure/repositories/personRepository";
import { Person } from "../../infrastructure/database/postgresql/models/person.model";
import { HttpConflict } from "../libraries/httpErrors";
import { EventPersonRepository } from "../../infrastructure/repositories/eventPersonRepository";
import { EventPerson } from "../../infrastructure/database/postgresql/models/eventPerson.model";
import { EventPersonEntity } from "../../domain/entities/eventPersonEntity";

export class EventPersonService {
  constructor(
    private readonly eventPersonRepository: EventPersonRepository
  ) { }

  private async storeIfNotExist(person: EventPersonEntity): Promise<EventPerson> {
    const personExistInEvent = await this.eventPersonRepository.findPersonInEvent(person)
    
    if (personExistInEvent.length == 0) {
      const eventPerson = await this.eventPersonRepository.store(person)
      return eventPerson
    }

    return personExistInEvent[0]
  }

  async store(persons: EventPersonEntity[]): Promise<EventPerson[]> {
    const eventPersons = await Promise.all(persons.map((person) => this.storeIfNotExist(person)))
    return eventPersons
  }
}