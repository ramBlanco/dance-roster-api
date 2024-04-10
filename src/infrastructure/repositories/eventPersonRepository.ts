import { EventPerson } from '../database/postgresql/models/eventPerson.model'

export class EventPersonRepository {

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
      eventId: params.eventId,
      tenantId: params.tenantId,
      locationId: params.locationId,
      personId: params.personId,
    }, { returning: true })
  }
}
