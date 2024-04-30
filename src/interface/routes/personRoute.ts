import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { IRoute } from '../../domain/interfaces/routeInterface'
import PersonController from '../controllers/personController'
import { diContainer } from '@fastify/awilix'

class PersonRoute implements IRoute {
  public prefixRoute = 'v1/person'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    // const localeService = diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/birthdays',
      {
        schema: {
          // description: localeService.translate('routes.person.getBirthdays.description'),
        },
      },
      PersonController.getBirthdays
    )
  }
}

export default PersonRoute
