import { FastifyReply, FastifyRequest } from 'fastify'
import { app } from '../../server'
import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { StudentIndexUseCase } from '../../application/useCases/students/studentIndexUseCase'

class StudentController {
  static async index(_request: FastifyRequest, reply: FastifyReply) {
    const indexUseCase = app.instance.diContainer.resolve<StudentIndexUseCase>(INJECTIONS.useCases.students.indexUseCase)
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
