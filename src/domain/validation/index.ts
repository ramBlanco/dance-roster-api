import { FastifyInstance } from 'fastify'
import { AuthSchema } from './auth'
import { UserSchema } from './userRequest'
import { EventsSchema } from './events'
import { LocationSchemas } from './locations'
import { PersonSchemas } from './persons'
import { TenantSchemas } from './tenants'

export const registerSchemas = (instance: FastifyInstance): void => {
  UserSchema(instance)
  AuthSchema(instance)
  EventsSchema(instance)
  LocationSchemas(instance)
  PersonSchemas(instance)
  TenantSchemas(instance)
}
