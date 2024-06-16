import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decoretor'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipes'
import { PrismaRepository } from '@/infra/prisma/repositories/prisma-repository'

const createQuestionsBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionsBodySchema = z.infer<typeof createQuestionsBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaRepository) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionsBodySchema))
    body: CreateQuestionsBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body

    const slug = this.convertToSlug(title)

    await this.prisma.findBySlug(slug)

    await this.prisma.createQuestion({
      title,
      slug,
      content,
      authorId: user.sub,
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
