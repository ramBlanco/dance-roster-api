import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../src/server";

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.instance.ready()
  app.instance.server.emit("request", req, res)
}