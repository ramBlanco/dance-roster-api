import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const LoginSchema = S.object()
  .id('Login')
  .prop('email', S.string().format(S.FORMATS.EMAIL))
  .required()
  .prop('password', S.string().minLength(5))
  .required()
  .title('LoginTitle')


  export const LoginResponseSchema = S.object()
  .id('LoginResponse')
  .prop('user', S.object().prop('id', S.string()).prop('username', S.string().format(S.FORMATS.EMAIL)).prop('tenant', S.object().ref('TenantObject#')))
  .required()
  .prop('token', S.string())
  .required()
  .prop('refreshToken', S.string())
  .required()
  .title('LoginResponseTitle')

export const AuthLoginSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(LoginSchema)
  fastify.addSchema(LoginResponseSchema)
}
