import { FastifyInstance } from 'fastify'
import S from 'fluent-json-schema'

export const AddPersonToEventRequestSchema = S.object()
  .id('AddPersonToEventRequest')
  .prop('persons', S.array().items(S.ref('StorePerson#')))
  .title('AddPersonToEventRequestTitle')