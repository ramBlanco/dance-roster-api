import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../..//application/services/localeService'
import { INJECTIONS } from '../..//infrastructure/config/dependencyInjection/di'
import { IRoute } from '../../domain/interfaces/routeInterface'
import StatusController from '../controllers/statusController'
import { diContainer } from '@fastify/awilix'

class StatusRoute implements IRoute {
  public prefixRoute = 'v1'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    // const localeService = diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/status',
      {
        schema: {
          description: '',
        },
      },
      (req, reply) => {
        reply.send({ hello: 'world' })
      },
    )
  }
}

export default StatusRoute
