import { FastifyInstance } from 'fastify'
import { AuthSchema } from './authRequest'
import { UserSchema } from './userRequest'
import { EventsSchema } from './events'
import { LocationSchemas } from './locations'

export const registerSchemas = (instance: FastifyInstance): void => {
  UserSchema(instance)
  AuthSchema(instance)
  EventsSchema(instance)
  LocationSchemas(instance)
}
