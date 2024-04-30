import { FastifyReply, FastifyRequest } from 'fastify'
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
import { diContainer } from '@fastify/awilix'
import { SignParamsWithJWT } from '../../domain/interfaces/jwtInterfaces'
import { EventDeleteUseCase } from '../../application/useCases/events/eventDeleteUseCase'
import { DeletePersonFromEventUseCase } from '../../application/useCases/events/deletePersonFromEventUseCase'
import { EventUpdateUseCase } from '../../application/useCases/events/eventUpdateUseCase'
import { UpdateEventRequest } from '../../domain/interfaces/requests/events/updateEventRequest'
import { EventGetNextUseCase } from '../../application/useCases/events/eventGetNextUseCase'

class EventController {
  static async index(request: FastifyRequest<{ Querystring: IEventIndexRequest }>, reply: FastifyReply) {
    const getEventIndexUseCase = diContainer.resolve<EventIndexUseCase>(INJECTIONS.useCases.events.indexUseCase)
    const events = await getEventIndexUseCase.handler({
      filters: request.query,
      userSession: request.user as SignParamsWithJWT
    })

    return reply.sendPaginationResponseData(events.rows, events.count)
  }

  static async store(request: FastifyRequest<{ Body: StoreEventRequest }>, reply: FastifyReply) {
    const eventStoreUseCase = diContainer.resolve<EventStoreUseCase>(INJECTIONS.useCases.events.storeUseCase)
    request.body.tenantId = (request.user as SignParamsWithJWT).tenantId

    const event = await eventStoreUseCase.handler(request.body)
    return reply.code(200).send(event)
  }

  static async view(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const eventViewUseCase = diContainer.resolve<EventViewUseCase>(INJECTIONS.useCases.events.viewUseCase)
    const event = await eventViewUseCase.handler(request.params.id)
    return reply.code(200).send(event)
  }

  static async addPersons(request: FastifyRequest<{ Params: { id: string }, Body: IStorePersonRequest }>, reply: FastifyReply) {
    const addPersonToEventUseCase = diContainer.resolve<AddPersonToEventUseCase>(INJECTIONS.useCases.events.addPersonToEventUseCase)
    const persons = await addPersonToEventUseCase.handler(
      {
        eventId: request.params.id,
        persons: request.body.persons
      }
    )
    return reply.code(200).send(persons)
  }

  static async getPersons(request: FastifyRequest<{ Params: { id: string }, Querystring: IEventPersonIndexRequest }>, reply: FastifyReply) {
    const getPersonToEventUseCase = diContainer.resolve<GetPersonFromEventUseCase>(INJECTIONS.useCases.events.getPersonFromEventUseCase)
    const persons = await getPersonToEventUseCase.handler({
      eventId: request.params.id,
    })
    return reply.sendPaginationResponseData(persons)
  }

  static async deletePersons(request: FastifyRequest<{ Params: { id: string }, Body: { eventPersonId: string } }>, reply: FastifyReply) {
    const deletePersonFromEventUseCase = diContainer.resolve<DeletePersonFromEventUseCase>(INJECTIONS.useCases.events.deletePersonFromEventUseCase)
    const tenantId = (request.user as SignParamsWithJWT).tenantId

    const persons = await deletePersonFromEventUseCase.handler(
      {
        eventId: request.params.id,
        eventPersonId: request.body.eventPersonId,
        tenantId: tenantId
      }
    )
    return reply.code(200).send(persons)
  }

  static async update(request: FastifyRequest<{ Params: { id: string }, Body: UpdateEventRequest }>, reply: FastifyReply) {
    const eventUpdateUseCase = diContainer.resolve<EventUpdateUseCase>(INJECTIONS.useCases.events.updateUseCase)
    const tenantId = (request.user as SignParamsWithJWT).tenantId

    const updatedEvent = await eventUpdateUseCase.handler(
      {
        eventId: request.params.id,
        tenantId: tenantId,
        bodyRequest: request.body
      }
    )
    return reply.code(200).send(updatedEvent)
  }

  static async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const eventDeleteUseCase = diContainer.resolve<EventDeleteUseCase>(INJECTIONS.useCases.events.deleteEventUseCase)
    const user = request.user as SignParamsWithJWT
    await eventDeleteUseCase.handler({
      id: String(request.params.id),
      tenantId: user.tenantId
    })
    return reply.code(200).send()
  }

  static async getNextEvent(request: FastifyRequest, reply: FastifyReply) {
    const eventGetNextUseCase = diContainer.resolve<EventGetNextUseCase>(INJECTIONS.useCases.events.eventGetNextUseCase)
    const tenantId = (request.user as SignParamsWithJWT).tenantId
    const response = await eventGetNextUseCase.handler({ tenantId: tenantId })
    return reply.code(200).send(response)
  }
}

export default EventController