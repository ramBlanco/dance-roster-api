import { FastifyReply, FastifyRequest } from 'fastify'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { StudentIndexUseCase } from '../../application/useCases/students/studentIndexUseCase'
import { diContainer } from '@fastify/awilix'

class StudentController {
  static async index(_request: FastifyRequest, reply: FastifyReply) {
    const indexUseCase = diContainer.resolve<StudentIndexUseCase>(INJECTIONS.useCases.students.indexUseCase)
    const events = await indexUseCase.handler({})

    return reply.sendPaginationResponseData(events)
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

export default StudentController
