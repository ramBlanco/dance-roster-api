import { randomUUID } from 'crypto'
import { HttpNotFound } from '../../application/libraries/httpErrors'
import { Event } from '../database/postgresql/models/event.model'
import { Location } from '../database/postgresql/models/location.model'

export class LocationsRepository {
  public async getAll(params: {
    where: Record<string, unknown>,
    limit: number,
    offset: number
  }): Promise<Location[]> {
    return await Location.findAll({
      where: params.where,
      limit: params.limit,
      offset: params.offset
    })
  }

  public async store(params: Pick<Location, "name" | "tenantId" | "address">): Promise<Location> {
    return await Location.create({
      id: randomUUID(),
      tenantId: params.tenantId,
      address: params.address,
      name: params.name,
    }, { returning: true })
  }

  public async view(id: string): Promise<Location> {
    const event = await Location.findOne({
      where: { id: String(id) },
      include: [{ model: Event, required: false, as: 'events' }]
    })
    if (!event) throw new HttpNotFound("LOCATION NOT FOUND")
    return event
  }
}
