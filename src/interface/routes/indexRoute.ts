import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { app } from '../../server'
import { IRoute } from '../../domain/interfaces/routeInterface'
import StatusController from '../controllers/statusController'
import IndexController from '../controllers/indexController'

class IndexRoute implements IRoute {
  public prefixRoute = ''

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    const localeService = app.instance.diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/',
      {
        schema: {
          description: localeService.translate('routes.index.description'),
        },
      },
      IndexController.index,
    )
  }
}

export default IndexRoute
