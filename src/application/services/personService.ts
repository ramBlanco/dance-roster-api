import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { PersonEntity } from "../../domain/entities/personEntity";
import { PersonRepository } from "../../infrastructure/repositories/personRepository";
import { Person } from "../../infrastructure/database/postgresql/models/person.model";
import { HttpConflict } from "../libraries/httpErrors";
import { IPaginationResponseRepository } from "../../domain/interfaces/paginationResponseRepositoryInterface";
import { EventsRepository } from "../../infrastructure/repositories/eventRepository";
import { EventPersonRepository } from "../../infrastructure/repositories/eventPersonRepository";
import { Op, Sequelize } from "sequelize";

export class PersonService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventsRepository,
    private readonly eventPersonRepository: EventPersonRepository,
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

  async getBirthdays(filters: IQueryFilterHandlerResponse): Promise<IPaginationResponseRepository<Person>> {

    const events = await this.eventRepository.getEvents({
      where: { tenantId: filters.where.tenantId }
    })
    const eventsId = events.rows.map((eventData) => eventData.id)

    const filterEventPerson = { event_id: { [Op.in]: eventsId } }

    const persons = await this.eventPersonRepository.getAll({ where: filterEventPerson })
    const personsId = persons.map((personData) => personData.personId)

    // get persons from events
    filters.where = {
      // ...filters.where,
      id: { [Op.in]: personsId },
      [Op.and]: [
        Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM birth_date')), Sequelize.literal('EXTRACT(MONTH FROM CURRENT_DATE)')),
        Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('DAY FROM birth_date')), Op.gte, Sequelize.literal('EXTRACT(DAY FROM CURRENT_DATE)')),
      ]
    }
    return await this.personRepository.getBirthDays({
      limit: filters.pagination.pageSize,
      offset: filters.pagination.offset,
      where: filters.where
    })
  }
}