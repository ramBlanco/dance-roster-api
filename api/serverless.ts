import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../src/server";

import Fastify from "fastify";
// Instantiate Fastify with some config
const serverlessApp = Fastify({
  logger: false,
});

serverlessApp.register(import("../functions/index"), {
  prefix: '/'
});

export default async (req: FastifyRequest, res: FastifyReply) => {
  await serverlessApp.ready()
  serverlessApp.server.emit("request", req, res)
}