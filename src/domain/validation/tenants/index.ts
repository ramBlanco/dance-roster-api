import { FastifyInstance } from "fastify"
import { LoadTenantSchema } from "./tenantSchema";

export const TenantSchemas = (fastify: FastifyInstance): void => {
  LoadTenantSchema(fastify)
}
