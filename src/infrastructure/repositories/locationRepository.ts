import { HttpNotFound } from '../../application/libraries/httpErrors'
import { EventEntity } from '../../domain/entities/eventEntity'
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
      tenantId: params.tenantId,
      address: params.address,
      name: params.name,
    }, { returning: true })
  }

  public async view(id: string): Promise<Location> {
    const event = await Location.findByPk(id)
    if (!event) throw new HttpNotFound("LOCATION NOT FOUND")
    return event
  }
}
