import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories.routes'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Servidor rodando')
  })
