import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const StoreEventSchema = S.object()
  .id('StorePayment')
  .title('StorePaymentTitle')

export const StoreEventResponseSchema = S.object()
  .id('StoreEventResponse')
  .title('StoreEventResponseTitle')

export const LoadStoreEventRequestSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(StoreEventSchema)
  fastify.addSchema(StoreEventResponseSchema)
}
