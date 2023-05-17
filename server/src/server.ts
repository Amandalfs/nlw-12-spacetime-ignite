import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories.routes'

const app = fastify()

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Servidor rodando')
  })
