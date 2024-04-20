import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { IRoute } from '../../domain/interfaces/routeInterface'
import EventController from '../controllers/eventController'
import { StoreEventResponseSchema, StoreEventSchema } from '../../domain/validation/events/storeEventSchemaRequest'
import { getSchemasResponse } from '../../domain/validation/generic'
import { AddPersonToEventRequestSchema } from '../../domain/validation/events/addPersonToEventSchemaRequest'
import { diContainer } from '@fastify/awilix'

class EventRoute implements IRoute {
  public prefixRoute = 'v1/events'

  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    // const localeService = diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.get(
      '/',
      {
        schema: {
          // description: localeService.translate('routes.event.index.description'),
        },
      },
      EventController.index,
    )

    fastify.post(
      '/',
      {
        schema: {
          // description: localeService.translate('routes.event.store.description'),
          body: StoreEventSchema,
          response: getSchemasResponse(StoreEventResponseSchema),
        },
      },
      EventController.store,
    )

    fastify.get(
      '/:id',
      {
        schema: {
          // description: localeService.translate('routes.event.view.description'),
        },
      },
      EventController.view,
    )

    fastify.post(
      '/:id/persons',
      {
        schema: {
          // description: localeService.translate('routes.event.addPersons.description'),
          body: AddPersonToEventRequestSchema,
        },
      },
      EventController.addPersons,
    )

    fastify.get(
      '/:id/persons',
      {
        schema: {
          // description: localeService.translate('routes.event.getPersons.description'),
        },
      },
      EventController.getPersons,
    )

    //TODO: add event controller method
    fastify.put(
      '/:id',
      {
        schema: {
          // description: localeService.translate('routes.event.update.description'),
        },
      },
      EventController.update,
    )

    fastify.delete(
      '/:id',
      {
        schema: {
          // description: localeService.translate('routes.event.delete.description'),
        },
      },
      EventController.delete,
    )
  }
}

export default EventRoute
