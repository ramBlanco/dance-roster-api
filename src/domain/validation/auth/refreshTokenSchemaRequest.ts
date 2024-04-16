import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const RefreshTokenSchema = S.object()
  .id('RefreshToken')
  .prop('authorization', S.string())
  .required()
  .title('RefreshTokenTitle')

export const RefreshTokenResponseSchema = S.object()
  .id('RefreshTokenResponse')
  .prop('token', S.string())
  .required()
  .prop('refreshToken', S.string())
  .required()
  .title('RefreshTokenResponseTitle')

export const RefreshTokenRequestSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(RefreshTokenSchema)
  fastify.addSchema(RefreshTokenResponseSchema)
}
