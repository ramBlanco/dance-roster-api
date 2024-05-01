import { FastifyReply, FastifyRequest } from 'fastify'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { diContainer } from '@fastify/awilix'
import { SignParamsWithJWT } from '../../domain/interfaces/jwtInterfaces'
import { MetricSalesUseCase } from '~src/application/useCases/metrics/metricSalesUseCase'

class MetricController {

  static async sales(request: FastifyRequest<{ Params: { locationId: string } }>, reply: FastifyReply) {
    const personsIndexUseCase = diContainer.resolve<MetricSalesUseCase>(INJECTIONS.useCases.metric.metricSalesUseCase)
    const userSession = request.user as SignParamsWithJWT
    
    const persons = await personsIndexUseCase.handler({
      tenantId: userSession.tenantId,
      locationId: request.params.locationId
    })

    return reply.sendPaginationResponseData(persons)
  }

}

export default MetricController
