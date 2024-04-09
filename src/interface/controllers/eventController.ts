import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '../../server'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { EventIndexUseCase } from '../../application/useCases/events/eventIndexUseCase'
import { EventStoreUseCase } from '../../application/useCases/events/eventStoreUseCase'
import { StoreEventRequest } from '../../domain/interfaces/requests/events/storeEventRequest'
import { EventViewUseCase } from '../../application/useCases/events/eventViewUseCase '
import { IEventIndexRequest } from '../../domain/interfaces/requests/events/indexEventRequest'

class EventController {
  static async index(request: FastifyRequest<{ Querystring: IEventIndexRequest }>, reply: FastifyReply) {
    const getEventIndexUseCase = app.instance.diContainer.resolve<EventIndexUseCase>(INJECTIONS.useCases.events.indexUseCase)
    const events = await getEventIndexUseCase.handler(request.query)

    return reply.sendPaginationResponseData(events)
  }

  static async store(request: FastifyRequest<{Body: StoreEventRequest}>, reply: FastifyReply) {
    const eventStoreUseCase = app.instance.diContainer.resolve<EventStoreUseCase>(INJECTIONS.useCases.events.storeUseCase)
    const event = eventStoreUseCase.handler(request.body)
    return reply.code(200).send(event)
  }

  static async view(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const eventViewUseCase = app.instance.diContainer.resolve<EventViewUseCase>(INJECTIONS.useCases.events.viewUseCase)
    const event = eventViewUseCase.handler(request.params.id)
    return reply.code(200).send(event)
  }

  static async update(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }

  static async delete(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }
}

export default EventController
