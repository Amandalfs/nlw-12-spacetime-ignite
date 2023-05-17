import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        except: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string().default('.'),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memorie = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'cd47bc9f-2e84-4dd8-84ad-d9569f74a084',
      },
    })

    return memorie
  })

  app.put('/memories/:id', async () => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string().default('.'),
      isPublic: z.coerce.boolean().default(false),
    })

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memorie = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'cd47bc9f-2e84-4dd8-84ad-d9569f74a084',
      },
    })

    return memorie
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.delete({
      where: {
        id,
      },
    })
    return memory
  })
}
