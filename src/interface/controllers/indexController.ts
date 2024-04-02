import { FastifyReply, FastifyRequest } from 'fastify'

class IndexController {
  static async index(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send(`hello world from fastify template `)
  }
}

export default IndexController
