import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
import { LocationsRepository } from "../../infrastructure/repositories/locationRepository";
import { Location } from "../../infrastructure/database/postgresql/models/location.model";
import { LocationEntity } from "../../domain/entities/locationEntity";

export class LocationService {
  constructor(private readonly locationRepository: LocationsRepository) { }

  async getAllByFilter(filters: IQueryFilterHandlerResponse): Promise<Location[]> {
    return await this.locationRepository.getAll({
      where: filters.where,
      offset: filters.pagination.offset,
      limit: filters.pagination.pageSize
    })
  }

  async storeLocation(requestBody: LocationEntity): Promise<Location> {
    return await this.locationRepository.store({
      name: requestBody.name,
      address: requestBody.address,
      tenantId: requestBody.tenantId,
    })
  }

  async viewLocation(id: string): Promise<Location> {
    return await this.locationRepository.view(id)
  }

  async deleteLocation(id: string, tenantId: string): Promise<void> {
    await this.locationRepository.delete(id, tenantId)
  }
}