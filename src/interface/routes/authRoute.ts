import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { LocaleService } from '../../application/services/localeService'
import { IRoute } from '../../domain/interfaces/routeInterface'
import { LoginResponseSchema, LoginSchema } from '../../domain/validation/auth/authRequest'
import { getSchemasResponse } from '../../domain/validation/generic'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import AuthController from '../controllers/authController'
import { diContainer } from '@fastify/awilix'
import { RefreshTokenResponseSchema, RefreshTokenSchema } from '../../domain/validation/auth/refreshTokenSchemaRequest'

class AuthRoute implements IRoute {
  prefixRoute = 'v1/auth'
  async routes(fastify: FastifyInstance, _options: FastifyPluginOptions, _done: any): Promise<void> {
    // const localeService = diContainer.resolve<LocaleService>(INJECTIONS.LOCALE_SERVICE)

    fastify.post(
      '/login',
      {
        schema: {
          // description: localeService.translate('routes.login.description'),
          body: LoginSchema,
          response: getSchemasResponse(LoginResponseSchema),
        },
      },
      AuthController.login,
    )
    
    //TODO: make controller method
    fastify.post(
      '/register',
      {
        schema: {
          // description: localeService.translate('routes.login.description'),
          body: LoginSchema,
          response: getSchemasResponse(LoginResponseSchema),
        },
      },
      AuthController.login,
    )

    //TODO: make controller method
    fastify.post(
      '/forgot-password',
      {
        schema: {
          // description: localeService.translate('routes.login.description'),
          body: LoginSchema,
          response: getSchemasResponse(LoginResponseSchema),
        },
      },
      AuthController.login,
    )

    fastify.get(
      '/refresh',
      {
        schema: {
          // description: localeService.translate('routes.login.description'),
          headers: RefreshTokenSchema,
          response: getSchemasResponse(RefreshTokenResponseSchema),
        },
      },
      AuthController.refresh,
    )
  }
}

export default AuthRoute
