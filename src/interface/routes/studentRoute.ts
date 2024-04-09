import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { app } from '../../server'
import { IRoute } from '../../domain/interfaces/routeInterface'
import StudentController from '../controllers/studentController'

class StudentRoute implements IRoute {
  public prefixRoute = 'v1/students'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    const localeService = app.instance.diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/',
      {
        schema: {
          description: localeService.translate('routes.event.index.description'),
        },
      },
      StudentController.index,
    )

    //TODO: add event controller method
    fastify.post(
      '/',
      {
        schema: {
          description: localeService.translate('routes.event.store.description'),
        },
      },
      StudentController.store,
    )

    //TODO: add event controller method
    fastify.put(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.event.update.description'),
        },
      },
      StudentController.update,
    )

    //TODO: add event controller method
    fastify.delete(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.event.delete.description'),
        },
      },
      StudentController.delete,
    )
  }
}

export default StudentRoute
