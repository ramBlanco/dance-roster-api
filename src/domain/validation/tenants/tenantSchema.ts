import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const TenantObjectSchema = S.object()
.id('TenantObject')
.prop('id', S.string().description('id'))
.prop('name', S.string().description('tenant name'))
.prop('createdAt', S.string().description('creation date'))
.prop('updatedAt', S.string().description('last updated date'))
.prop('deletedAt', S.anyOf([S.string(), S.null()])).description('deleted date')
.title('TenantObjectTitle')

export const LoadTenantSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(TenantObjectSchema)
}
