import { FastifyInstance } from "fastify"
import { AuthLoginSchema } from "./authRequest"
import { RefreshTokenRequestSchema } from "./refreshTokenSchemaRequest"

export const AuthSchema = (fastify: FastifyInstance): void => {
  AuthLoginSchema(fastify)
  RefreshTokenRequestSchema(fastify)
}
