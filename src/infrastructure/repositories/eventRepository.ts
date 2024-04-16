import { randomUUID } from 'crypto'
import { HttpNotFound } from '../../application/libraries/httpErrors'
import { EventEntity } from '../../domain/entities/eventEntity'
import { Event } from '../database/postgresql/models/event.model'
import { Location } from '../database/postgresql/models/location.model'
import { Person } from '../database/postgresql/models/person.model'
import { IPaginationResponseRepository } from '../../domain/interfaces/paginationResponseRepositoryInterface'
import { slugify } from '../../application/libraries/sluglify'

export class EventsRepository {
  public async getEvents(params: {
    where: Record<string, unknown>,
    limit: number,
    offset: number
  }): Promise<IPaginationResponseRepository<Event>> {
    return await Event.findAndCountAll({
      where: params.where,
      limit: params.limit,
      offset: params.offset,
      include: {
        model: Location,
        required: true
      },
      order: [
        ['date', 'DESC']
      ]
    })
  }

  public async viewBySlug(slug: string): Promise<IPaginationResponseRepository<Event>> {
    try {
      const event = await Event.findAndCountAll({
        where: { slug },
        include: [
          {
            model: Location,
            required: false,
          },
          {
            model: Person,
            required: false
          }
        ]
      })
      if (!event) throw new Error("EVENT NOT FOUND")
      return event
    } catch (error) {
      throw new HttpNotFound("EVENT NOT FOUND")
    }
  }

  //TODO: revisar el uuid automatico
  public async store(params: Pick<Event, "date" | "tenantId" | "locationId" | "title">): Promise<Event> {

    let slug = slugify(`${params.title}-${params.date}`)

    const slugExists = await this.viewBySlug(slug)
    if (slugExists.count > 0) {
      slug = `${slug}_${slugExists.count + 1}`
    }

    return await Event.create({
      id: randomUUID(),
      date: params.date,
      tenantId: params.tenantId,
      locationId: params.locationId,
      slug: slug,
      title: params.title,
    }, { returning: true })
  }

  public async view(id: string): Promise<Event> {
    try {
      const event = await Event.findOne({
        where: { id },
        include: [
          {
            model: Location,
            required: false,
          },
          {
            model: Person,
            required: false
          }
        ]
      })
      if (!event) throw new Error("EVENT NOT FOUND")
      return event
    } catch (error) {
      console.log(error)
      throw new HttpNotFound("EVENT NOT FOUND")
    }
  }
}
