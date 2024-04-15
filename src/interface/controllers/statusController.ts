import { FastifyReply, FastifyRequest } from 'fastify'

class StatusController {
  static async checkStatus(_request: FastifyRequest, reply: FastifyReply) {
    reply.send({ status: "active" })
  }
}

export default StatusController
