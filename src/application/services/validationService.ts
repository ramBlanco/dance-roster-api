import { PersonRepository } from "../../infrastructure/repositories/personRepository";
import { LocationsRepository } from "../../infrastructure/repositories/locationRepository";
import { TenantRepository } from "../../infrastructure/repositories/tenantRepository";
import { HttpBadRequest } from "../libraries/httpErrors";
import { Person } from "../../infrastructure/database/postgresql/models/person.model";
import { EventsRepository } from "../../infrastructure/repositories/eventRepository";
import { Event } from "../../infrastructure/database/postgresql/models/event.model";

export class ValidationService {
  private readonly regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  constructor(
    private readonly locationRepository: LocationsRepository,
    private readonly tenantRepository: TenantRepository,
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventsRepository,
  ) {}

  private validateUUID(id: string): void {
    if (!id.match(this.regex)) {
      throw new HttpBadRequest("ID INVALID")
    }
  }

  public async validateTenant(id: string) {
    this.validateUUID(id)
    await this.tenantRepository.view(id)
  }

  public async validateLocation(id: string) {
    this.validateUUID(id)
    await this.locationRepository.view(id)
  }

  public async validatePerson(id: string): Promise<Person | null> {
    this.validateUUID(id)
    try {
      return await this.personRepository.view(id)
    } catch (error) {
      return null
    }
  }

  public async validateEvent(id: string): Promise<Event | null> {
    this.validateUUID(id)
    try {
      return await this.eventRepository.view(id)
    } catch (error) {
      return null
    }
  }

  public async validateEventBySlug(slug: string): Promise<Event | null> {
    try {
      const eventBySlug = await this.eventRepository.viewBySlug(slug)
      const [event] = eventBySlug.rows
      return event
    } catch (error) {
      return null
    }
  }
}