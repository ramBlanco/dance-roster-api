import { HttpNotFound } from '../../application/libraries/httpErrors'
import { Tenant } from '../database/postgresql/models/tenant.model'

export class TenantRepository {

  public async view(id: string): Promise<Tenant> {
    const event = await Tenant.findOne({ where: { id: String(id) } })
    if (!event) throw new HttpNotFound("TENANT NOT FOUND")
    return event
  }
}
