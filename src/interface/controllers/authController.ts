import { FastifyReply, FastifyRequest } from 'fastify'
import { LoginUseCase } from '../../application/useCases/auth/loginUseCase'
import { ILoginBodyRequest } from '../../domain/interfaces/requests/authRequestInterface'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { diContainer } from '@fastify/awilix'
import { IRefreshHeadersRequest } from '../../domain/interfaces/requests/auth/refreshTokenRequest'
import { DecodedRefreshToken } from '../../domain/interfaces/jwtInterfaces'
import { RefreshTokenUseCase } from '../../application/useCases/auth/refreshTokenUseCase'

class AuthController {
  static async login(request: FastifyRequest<{ Body: ILoginBodyRequest }>, reply: FastifyReply) {
    const loginUseCase = diContainer.resolve<LoginUseCase>(INJECTIONS.LOGIN_USE_CASE)
    const user = await loginUseCase.handler(request.body)
    return reply.send(user)
  }

  static async refresh(request: FastifyRequest<{ Headers: IRefreshHeadersRequest, User: DecodedRefreshToken }>, reply: FastifyReply) {
    const refreshTokenUseCase = diContainer.resolve<RefreshTokenUseCase>(INJECTIONS.REFRESH_TOKEN_USE_CASE)
    const user = request.user
    const refreshResponse = await refreshTokenUseCase.handler(user as DecodedRefreshToken)
    return reply.send(refreshResponse)
  }
}

export default AuthController
