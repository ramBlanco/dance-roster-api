import { randomUUID } from 'crypto'
import { EventPerson } from '../database/postgresql/models/eventPerson.model'
import { Person } from '../database/postgresql/models/person.model'

export class EventPersonRepository {

  public async getAll(params: {
    where: Record<string, unknown>,
    limit: number,
    offset: number
  }): Promise<EventPerson[]> {
    return await EventPerson.findAll({
      where: params.where,
      limit: params.limit,
      offset: params.offset,
      include: [
        { model: Person, required: true }
      ]
    })
  }

  public async findPersonInEvent(
    params: {
      eventId: string,
      personId: string,
      tenantId: string,
      locationId: string
    }
  ): Promise<EventPerson[]> {
    return await EventPerson.findAll<EventPerson>({
      where: params,
      limit: 1
    })
  }

  public async store(params: Pick<EventPerson, "tenantId" | "eventId" | "locationId" | "personId">): Promise<EventPerson> {
    return await EventPerson.create({
      id: randomUUID(),
      eventId: params.eventId,
      tenantId: params.tenantId,
      locationId: params.locationId,
      personId: params.personId,
    }, { returning: true })
  }
}
