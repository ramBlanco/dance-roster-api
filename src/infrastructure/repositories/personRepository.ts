import { randomUUID } from 'crypto'
import { HttpNotFound } from '../../application/libraries/httpErrors'
import { Person } from '../database/postgresql/models/person.model'
import { IPaginationResponseRepository } from '~src/domain/interfaces/paginationResponseRepositoryInterface'
import { Event } from '../database/postgresql/models/event.model'
import { Sequelize } from 'sequelize'

export class PersonRepository {
  public async getAll(params: {
    where: Record<string, unknown>,
    limit: number,
    offset: number
  }): Promise<Person[]> {
    return await Person.findAll({
      where: params.where,
      limit: params.limit,
      offset: params.offset
    })
  }

  public async findByEmail(email: string): Promise<Person | null> {
    const person = await Person.findOne({ where: { email } })
    return person
  }

  public async store(params: Pick<Person, "birthDate" | "email" | "firstName" | "lastName">): Promise<Person> {
    return await Person.create({
      id: randomUUID(),
      birthDate: params.birthDate,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName
    }, { returning: true })
  }

  public async view(id: string): Promise<Person> {
    const event = await Person.findOne({ where: { id: String(id) } })
    if (!event) throw new HttpNotFound("LOCATION NOT FOUND")
    return event
  }

  public async getBirthDays(params: {
    where: Record<string, unknown>,
    limit: number,
    offset: number,
  }): Promise<IPaginationResponseRepository<Person>> {
    return await Person.findAndCountAll({
      where: params.where,
      limit: params.limit,
      offset: params.offset,
      order: [
        Sequelize.literal(`CASE
        WHEN DATE_PART('month', birth_date) >= EXTRACT(MONTH FROM CURRENT_DATE)
        THEN DATE_PART('month', birth_date) - EXTRACT(MONTH FROM CURRENT_DATE)
        ELSE 12 - EXTRACT(MONTH FROM CURRENT_DATE) + DATE_PART('month', birth_date)
        END`),
        Sequelize.literal(`DATE_PART('day', birth_date)`)
      ]
    })
  }
}
