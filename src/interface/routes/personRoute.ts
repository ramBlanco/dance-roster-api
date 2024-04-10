import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { app } from '../../server'
import { IRoute } from '../../domain/interfaces/routeInterface'
import { getSchemasResponse } from '../../domain/validation/generic'
import PersonController from '../controllers/personController'
import { StorePersonResponseSchema, StorePersonSchema } from '../../domain/validation/persons/storePersonSchemaRequest'
import { PersonObjectSchema } from '../../domain/validation/persons/personSchema'
import { PersonIndexResponseSchema } from '../../domain/validation/persons/indexPersonRequest'

class PersonRoute implements IRoute {
  public prefixRoute = 'v1/person'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    const localeService = app.instance.diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/',
      {
        schema: {
          description: localeService.translate('routes.person.index.description'),
          response: getSchemasResponse(PersonIndexResponseSchema)
        },
      },
      PersonController.index,
    )

    fastify.post(
      '/',
      {
        schema: {
          description: localeService.translate('routes.person.store.description'),
          body: StorePersonSchema,
          response: getSchemasResponse(StorePersonResponseSchema),
        },
      },
      PersonController.store,
    )

    fastify.get(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.person.view.description'),
          response: getSchemasResponse(PersonObjectSchema),
        },
      },
      PersonController.view,
    )

    //TODO: add event controller method
    fastify.put(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.person.update.description'),
        },
      },
      PersonController.update,
    )

    //TODO: add event controller method
    fastify.delete(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.person.delete.description'),
        },
      },
      PersonController.delete,
    )
  }
}

export default PersonRoute
