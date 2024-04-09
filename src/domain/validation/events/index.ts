import { FastifyInstance } from "fastify"
import { LoadStoreEventRequestSchema } from "./storeEventSchemaRequest"

export const EventsSchema = (fastify: FastifyInstance): void => {
  LoadStoreEventRequestSchema(fastify)
}
