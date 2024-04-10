import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const LocationObjectSchema = S.object()
.id('LocationObject')
.prop('id', S.string().description('id'))
.prop('name', S.string().description('location name'))
.prop('address', S.string().description('address'))
.prop('tenantId', S.string().description('tenant'))
.prop('createdAt', S.string().description('creation date'))
.prop('updatedAt', S.string().description('last updated date'))
.prop('deletedAt', S.anyOf([S.string(), S.null()])).description('deleted date')
.title('LocationObjectTitle')

export const LoadLocationSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(LocationObjectSchema)
}
