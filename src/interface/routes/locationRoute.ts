import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { app } from '../../server'
import { IRoute } from '../../domain/interfaces/routeInterface'
import { getSchemasResponse } from '../../domain/validation/generic'
import LocationController from '../controllers/locationController'
import { StoreLocationResponseSchema, StoreLocationSchema } from '../../domain/validation/locations/storeLocationSchemaRequest'

class LocationRoute implements IRoute {
  public prefixRoute = 'v1/location'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    const localeService = app.instance.diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/',
      {
        schema: {
          description: localeService.translate('routes.location.index.description'),
        },
      },
      LocationController.index,
    )

    fastify.post(
      '/',
      {
        schema: {
          description: localeService.translate('routes.location.store.description'),
          body: StoreLocationSchema,
          response: getSchemasResponse(StoreLocationResponseSchema),
        },
      },
      LocationController.store,
    )

    fastify.get(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.location.view.description'),
        },
      },
      LocationController.view,
    )

    //TODO: add event controller method
    fastify.put(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.location.update.description'),
        },
      },
      LocationController.update,
    )

    //TODO: add event controller method
    fastify.delete(
      '/:id',
      {
        schema: {
          description: localeService.translate('routes.location.delete.description'),
        },
      },
      LocationController.delete,
    )
  }
}

export default LocationRoute
