import { FastifyReply, FastifyRequest } from 'fastify'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { LocationIndexUseCase } from '../../application/useCases/locations/locationIndexUseCase'
import { ILocationIndexRequest } from '../../domain/interfaces/requests/locations/indexLocationRequest'
import { LocationStoreUseCase } from '../../application/useCases/locations/locationStoreUseCase'
import { StoreLocationRequest } from '../../domain/interfaces/requests/locations/storeLocationRequest'
import { LocationViewUseCase } from '../../application/useCases/locations/locationViewUseCase '
import { diContainer } from '@fastify/awilix'
import { SignParamsWithJWT } from '~src/domain/interfaces/jwtInterfaces'

class LocationController {
  static async index(request: FastifyRequest<{ Querystring: ILocationIndexRequest }>, reply: FastifyReply) {
    const locationIndexUseCase = diContainer.resolve<LocationIndexUseCase>(INJECTIONS.useCases.locations.indexUseCase)
    const locations = await locationIndexUseCase.handler(request.query)
    return reply.sendPaginationResponseData(locations)
  }

  static async store(request: FastifyRequest<{ Body: StoreLocationRequest, User: SignParamsWithJWT }>, reply: FastifyReply) {
    const locationStoreUseCase = diContainer.resolve<LocationStoreUseCase>(INJECTIONS.useCases.locations.storeUseCase)
    const user = request.user as SignParamsWithJWT
    request.body.tenantId = user.tenantId
    const location = await locationStoreUseCase.handler(request.body)
    return reply.code(200).send(location)
  }

  static async view(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const locationViewUseCase = diContainer.resolve<LocationViewUseCase>(INJECTIONS.useCases.locations.viewUseCase)
    const location = await locationViewUseCase.handler(request.params.id)
    return reply.code(200).send(location)
  }

  static async update(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }

  static async delete(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }
}

export default LocationController
