import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'


export const LocationIndexResponseSchema = S.object()
  .id('LocationIndexResponseSchema')
  .allOf([S.object().ref('PaginationResponseData#'), S.object().prop('data', S.array().items(S.ref('LocationObject#')))])
  .title('LocationIndexResponseSchemaTitle')

export const LoadIndexLocationSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(LocationIndexResponseSchema)
}
