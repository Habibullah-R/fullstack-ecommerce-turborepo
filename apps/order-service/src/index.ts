import Fastify from 'fastify'

const fastify = Fastify()
const PORT = 8001

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    console.log(`Order service listening on port ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()