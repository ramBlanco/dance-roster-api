import { FastifyReply, FastifyRequest } from 'fastify'

class EventController {
  static async index(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send([])
  }

  static async store(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }

  static async update(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }

  static async delete(_request: FastifyRequest, reply: FastifyReply) {
    return reply.code(200).send({})
  }
}

export default EventController
