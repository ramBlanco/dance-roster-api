import { FastifyReply, FastifyRequest } from 'fastify'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { PersonIndexUseCase } from '../../application/useCases/persons/personIndexUseCase'
import { PersonStoreUseCase } from '../../application/useCases/persons/personStoreUseCase'
import { PersonViewUseCase } from '../../application/useCases/persons/personViewUseCase '
import { IPersonIndexRequest } from '../../domain/interfaces/requests/persons/indexPersonRequest'
import { IStorePersonRequest } from '../../domain/interfaces/requests/persons/storePersonRequest'
import { diContainer } from '@fastify/awilix'

class PersonController {
  static async index(request: FastifyRequest<{ Querystring: IPersonIndexRequest }>, reply: FastifyReply) {
    const personsIndexUseCase = diContainer.resolve<PersonIndexUseCase>(INJECTIONS.useCases.persons.indexUseCase)
    const persons = await personsIndexUseCase.handler(request.query)
    return reply.sendPaginationResponseData(persons)
  }

  static async store(request: FastifyRequest<{ Body: IStorePersonRequest }>, reply: FastifyReply) {
    const personStoreUseCase = diContainer.resolve<PersonStoreUseCase>(INJECTIONS.useCases.persons.storeUseCase)
    const person = await personStoreUseCase.handler(request.body)
    return reply.code(200).send(person)
  }

  static async view(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const personViewUseCase = diContainer.resolve<PersonViewUseCase>(INJECTIONS.useCases.persons.viewUseCase)
    const person = await personViewUseCase.handler(request.params.id)
    return reply.code(200).send(person)
  }

  static async update(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }

  static async delete(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }
}

export default PersonController
