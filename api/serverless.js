import Fastify from "fastify";
// Instantiate Fastify with some config
const serverlessApp = Fastify({
  logger: false,
});


serverlessApp.get('/', async (req, res) => {
  res.status(200).send({
      hello: 'World from serverlessApp'
  })
})

export default async (req, res) => {
  await serverlessApp.ready()
  serverlessApp.server.emit("request", req, res)
}