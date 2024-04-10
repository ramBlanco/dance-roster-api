import { FastifyInstance } from "fastify"
import { LoadIndexLocationSchema } from "./indexLocationRequest";
import { LoadLocationSchema } from "./locationSchema";
import { LoadStoreLocationRequestSchema } from "./storeLocationSchemaRequest";

export const LocationSchemas = (fastify: FastifyInstance): void => {
  LoadLocationSchema(fastify)
  LoadIndexLocationSchema(fastify)
  LoadStoreLocationRequestSchema(fastify)
}
