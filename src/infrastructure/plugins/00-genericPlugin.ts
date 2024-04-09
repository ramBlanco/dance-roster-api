import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import fp from 'fastify-plugin'

function genericPlugin(fastifyInstance: FastifyInstance, _opts: Record<never, never>, done: HookHandlerDoneFunction) {
  // hook for log request
  fastifyInstance.addHook('preHandler', (req, _reply, done) => {
    if (req.query) fastifyInstance.log.info({ query: req.query }, 'parsed query')
    if (req.body) fastifyInstance.log.info({ body: req.body }, 'parsed body')
    done()
  })

  fastifyInstance.setErrorHandler((err, _req, reply) => {
    if (err.statusCode === 429) {
      reply.code(429)
      err.message = 'You hit the rate limit!'
    }
    reply.send(err)
  })

  fastifyInstance.decorateReply('sendPaginationResponseData', async function (data: unknown, total?: number) {
    const payload = {
      status: 200,
      metadata: {
        count: 0,
        total: 0,
      },
      data,
    }

    if (Array.isArray(data)) {
      payload.metadata.count = data.length
      payload.metadata.total = total || 0
    }

    await this.send(payload)
    await this.status(200)
  })

  done()
}

export default fp(genericPlugin)
