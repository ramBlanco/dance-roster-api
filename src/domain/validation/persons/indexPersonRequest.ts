import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'


export const PersonIndexResponseSchema = S.object()
  .id('PersonIndexResponseSchema')
  .allOf([S.object().ref('PaginationResponseData#'), S.object().prop('data', S.array().items(S.ref('PersonObject#')))])
  .title('PersonIndexResponseSchemaTitle')

export const LoadIndexPersonSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(PersonIndexResponseSchema)
}
