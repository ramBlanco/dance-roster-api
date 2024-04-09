import { EventEntity } from '../../domain/entities/eventEntity'
import { app } from '../../server'

export class EventsRepository {
  public async getEvents(): Promise<[]> {
    return []
  }

  public async store(): Promise<EventEntity> {
    return {}
  }

  public async view(id: string): Promise<EventEntity> {
    return {}
  }
}
