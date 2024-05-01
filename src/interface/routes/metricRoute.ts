import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { IRoute } from '../../domain/interfaces/routeInterface'
import PersonController from '../controllers/personController'
import MetricController from '../controllers/metricController'

class MetricRoute implements IRoute {
  public prefixRoute = 'v1/metric'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    // const localeService = diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/sales/:locationId',
      {
        schema: {
          // description: localeService.translate('routes.person.getBirthdays.description'),
        },
      },
      MetricController.sales
    )
  }
}

export default MetricRoute