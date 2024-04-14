import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '../../server'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { EventIndexUseCase } from '../../application/useCases/events/eventIndexUseCase'
import { EventStoreUseCase } from '../../application/useCases/events/eventStoreUseCase'
import { StoreEventRequest } from '../../domain/interfaces/requests/events/storeEventRequest'
import { EventViewUseCase } from '../../application/useCases/events/eventViewUseCase '
import { IEventIndexRequest } from '../../domain/interfaces/requests/events/indexEventRequest'
import { AddPersonToEventUseCase } from '../../application/useCases/events/addPersonToEventUseCase'
import { IStorePersonRequest } from '../../domain/interfaces/requests/persons/storePersonRequest'
import { GetPersonFromEventUseCase } from '../../application/useCases/events/getPersonFromEventUseCase'
import { IEventPersonIndexRequest } from '../../domain/interfaces/requests/events/getPersonFromEventRequest'

class EventController {
  static async index(request: FastifyRequest<{ Querystring: IEventIndexRequest }>, reply: FastifyReply) {
    const getEventIndexUseCase = app.instance.diContainer.resolve<EventIndexUseCase>(INJECTIONS.useCases.events.indexUseCase)
    const events = await getEventIndexUseCase.handler(request.query)

    return reply.sendPaginationResponseData(events.rows, events.count)
  }

  static async store(request: FastifyRequest<{ Body: StoreEventRequest }>, reply: FastifyReply) {
    const eventStoreUseCase = app.instance.diContainer.resolve<EventStoreUseCase>(INJECTIONS.useCases.events.storeUseCase)
    const event = await eventStoreUseCase.handler(request.body)
    return reply.code(200).send(event)
  }

  static async view(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const eventViewUseCase = app.instance.diContainer.resolve<EventViewUseCase>(INJECTIONS.useCases.events.viewUseCase)
    const event = await eventViewUseCase.handler(request.params.id)
    return reply.code(200).send(event)
  }

  static async addPersons(request: FastifyRequest<{ Params: { id: string }, Body: IStorePersonRequest }>, reply: FastifyReply) {
    const addPersonToEventUseCase = app.instance.diContainer.resolve<AddPersonToEventUseCase>(INJECTIONS.useCases.events.addPersonToEventUseCase)
    const persons = await addPersonToEventUseCase.handler(
      {
        eventId: request.params.id,
        persons: request.body.persons
      }
    )
    return reply.code(200).send(persons)
  }

  static async getPersons(request: FastifyRequest<{ Params: { id: string }, Querystring: IEventPersonIndexRequest }>, reply: FastifyReply) {
    const getPersonToEventUseCase = app.instance.diContainer.resolve<GetPersonFromEventUseCase>(INJECTIONS.useCases.events.getPersonFromEventUseCase)
    const persons = await getPersonToEventUseCase.handler({
      eventId: request.params.id,
    })
    return reply.sendPaginationResponseData(persons)
  }

  static async update(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }

  static async delete(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }
}

export default EventController