import { FastifyInstance } from 'fastify'
import { AuthSchema } from './authRequest'
import { UserSchema } from './userRequest'
import { EventsSchema } from './events'

export const registerSchemas = (instance: FastifyInstance): void => {
  UserSchema(instance)
  AuthSchema(instance)
  EventsSchema(instance)
}
