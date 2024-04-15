import { FastifyInstance } from 'fastify';
import { buildApp } from './app'
import config from './infrastructure/config/config';

async function main(): Promise<FastifyInstance> {
  const app = await buildApp()
  await app
    .listen({
      port: config.api.port,
      host: config.api.domainName,
    })
    .catch((err) => {
      app.log.fatal({ msg: `Application startup error`, err })
    })
    .then(() => {
      console.log(`App listening on the http://${config.api.domainName}:${config.api.port} 🚀`)
    })

  return app
}

main().catch((err) => console.error(err))