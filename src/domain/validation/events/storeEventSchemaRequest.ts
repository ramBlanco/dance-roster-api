import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const EventObjectSchema = S.object()
.id('EventObject')
.prop('id', S.string().description('event id'))
.prop('date', S.string().description('event date'))
.prop('tenantId', S.string().description('tenant'))
.prop('locationId', S.string().description('location of event'))
.prop('title', S.string().description('title'))
.prop('createdAt', S.string().description('creation date of event'))
.prop('updatedAt', S.string().description('last updated date of event'))
.prop('deletedAt', S.string().description('last updated date of event'))
.title('EventObjectTitle')

export const StoreEventSchema = S.object()
  .id('StoreEvent')
  .prop('date', S.string().format("date").required().description('event date'))
  .prop('locationId', S.string().required().description('location of event'))
  .prop('title', S.string().required().description('title'))
  .title('StoreEventTitle')

export const StoreEventResponseSchema = S.object()
  .id('StoreEventResponse')
  .title('StoreEventResponseTitle')
  .ref('EventObject#')

export const EventIndexResponseSchema = S.object()
  .id('EventIndexResponseSchema')
  .allOf([S.object().ref('PaginationResponseData#'), S.object().prop('data', S.array().items(S.ref('EventObject#')))])
  .title('EventIndexResponseSchemaTitle')

export const LoadStoreEventRequestSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(EventObjectSchema)
  fastify.addSchema(StoreEventSchema)
  fastify.addSchema(StoreEventResponseSchema)
  fastify.addSchema(EventIndexResponseSchema)
}
