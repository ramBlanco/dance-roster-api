import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { EventPersonRepository } from "../../infrastructure/repositories/eventPersonRepository";
import { EventPerson } from "../../infrastructure/database/postgresql/models/eventPerson.model";
import { EventPersonEntity } from "../../domain/entities/eventPersonEntity";

export class EventPersonService {
  constructor(
    private readonly eventPersonRepository: EventPersonRepository
  ) { }

  async getEventPersonsByFilter(filters: IQueryFilterHandlerResponse): Promise<EventPerson[]> {
    return await this.eventPersonRepository.getAll({
      where: filters.where,
      offset: filters.pagination.offset,
      limit: filters.pagination.pageSize
    })
  }

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