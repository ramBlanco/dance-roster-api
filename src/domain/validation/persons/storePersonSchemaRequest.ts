import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const StorePersonSchema = S.object()
  .id('StorePerson')
  .prop('birthDate', S.string().format("date").required().description('birth date'))
  .prop('email', S.string().format(S.FORMATS.EMAIL).required().description('email'))
  .prop('firstName', S.string().required().description('first name'))
  .prop('lastName', S.string().required().description('last name'))
  .title('StorePersonTitle')

export const StorePersonResponseSchema = S.object()
  .id('StorePersonResponse')
  .title('StorePersonResponseTitle')
  .ref('PersonObject#')

export const LoadStorePersonRequestSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(StorePersonSchema)
  fastify.addSchema(StorePersonResponseSchema)
}
