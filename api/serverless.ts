import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../src/server";

// import Fastify from "fastify";
// Instantiate Fastify with some config
//const serverlessApp = Fastify({
//  logger: false,
//});
//
//serverlessApp.get('/', (_, reply) => {
//  return reply.status(200).send('this is a new message')
//})

export default async (req: FastifyRequest, res: FastifyReply) => {
  await app.instance.ready()
  app.instance.server.emit("request", req, res)
}