import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const StoreLocationSchema = S.object()
  .id('StoreLocation')
  .prop('name', S.string().required().description('name'))
  .prop('tenantId', S.string().required().description('tenant'))
  .prop('address', S.string().required().description('address'))
  .title('StoreLocationTitle')

export const StoreLocationResponseSchema = S.object()
  .id('StoreLocationResponse')
  .title('StoreLocationResponseTitle')
  .ref('LocationObject#')

export const LoadStoreLocationRequestSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(StoreLocationSchema)
  fastify.addSchema(StoreLocationResponseSchema)
}
