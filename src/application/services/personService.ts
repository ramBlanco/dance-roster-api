import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { PersonEntity } from "../../domain/entities/personEntity";
import { PersonRepository } from "../../infrastructure/repositories/personRepository";
import { Person } from "../../infrastructure/database/postgresql/models/person.model";
import { HttpConflict } from "../libraries/httpErrors";

export class PersonService {
  constructor(
    private readonly personRepository: PersonRepository
  ) { }

  async getAllByFilter(filters: IQueryFilterHandlerResponse): Promise<Person[]> {
    return await this.personRepository.getAll({
      where: filters.where,
      offset: filters.pagination.offset,
      limit: filters.pagination.pageSize
    })
  }

  async storePerson(requestBody: PersonEntity): Promise<Person> {
    const personFromDatabase = await this.personRepository.findByEmail(requestBody.email)
    if (personFromDatabase) throw new HttpConflict("EMAIL IN USE");
    return await this.personRepository.store(requestBody)
  }

  async viewPerson(id: string): Promise<Person> {
    return await this.personRepository.view(id)
  }

  async findByEmailOrInsert(persons: PersonEntity[]): Promise<Person[]> {
    const personsData = await Promise.all(
      persons.map(async (person) => {
        let personFromDatabase = await this.personRepository.findByEmail(person.email)
        if (!personFromDatabase) {
          personFromDatabase = await this.storePerson(person)
        }
        return personFromDatabase
      })
    )
    return personsData
  }
}