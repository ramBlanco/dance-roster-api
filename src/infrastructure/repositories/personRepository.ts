import { HttpNotFound } from '../../application/libraries/httpErrors'
import { Person } from '../database/postgresql/models/person.model'

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
}
