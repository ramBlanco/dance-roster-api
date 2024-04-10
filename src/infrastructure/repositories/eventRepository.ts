import { HttpNotFound } from '../../application/libraries/httpErrors'
import { EventEntity } from '../../domain/entities/eventEntity'
import { Event } from '../database/postgresql/models/event.model'

export class EventsRepository {
  public async getEvents(params: {
    where: Record<string, unknown>,
    limit: number,
    offset: number
  }): Promise<Event[]> {
    return await Event.findAll({
      where: params.where,
      limit: params.limit,
      offset: params.offset
    })
  }

  public async store(params: Pick<Event, "date" | "tenantId" | "locationId" | "title">): Promise<Event> {
    return await Event.create({
      date: params.date,
      tenantId: params.tenantId,
      locationId: params.locationId,
      title: params.title,
    }, { returning: true })
  }

  public async view(id: string): Promise<Event> {
    try {
      const event = await Event.findByPk(id)
      if (!event) throw new Error("EVENT NOT FOUND")
      return event
    } catch (error) {
      throw new HttpNotFound("EVENT NOT FOUND")
    }
  }
}
