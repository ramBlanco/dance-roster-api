import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const PersonObjectSchema = S.object()
.id('PersonObject')
.prop('id', S.string().description('id'))
.prop('birthDate', S.string().description('birth date'))
.prop('email', S.string().description('email'))
.prop('firstName', S.string().description('first name'))
.prop('lastName', S.string().description('last name'))
.prop('createdAt', S.string().description('creation date'))
.prop('updatedAt', S.string().description('last updated date'))
.prop('deletedAt', S.anyOf([S.string(), S.null()])).description('deleted date')
.title('PersonObjectTitle')

export const LoadPersonSchema = (fastify: FastifyInstance): void => {
  fastify.addSchema(PersonObjectSchema)
}
