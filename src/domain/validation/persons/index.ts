import { FastifyInstance } from "fastify"
import { LoadIndexPersonSchema } from "./indexPersonRequest";
import { LoadPersonSchema } from "./personSchema";
import { LoadStorePersonRequestSchema } from "./storePersonSchemaRequest";

export const PersonSchemas = (fastify: FastifyInstance): void => {
  LoadPersonSchema(fastify)
  LoadIndexPersonSchema(fastify)
  LoadStorePersonRequestSchema(fastify)
}
