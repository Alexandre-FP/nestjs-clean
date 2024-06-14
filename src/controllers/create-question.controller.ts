import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser } from 'src/auth/current-user-decoretor'
import { UserPayload } from 'src/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes'
import { PrismaRepository } from 'src/prisma/prisma-repository/prisma-repository'

const createQuestionsBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string(),
})

type CreateQuestionsBodySchema = z.infer<typeof createQuestionsBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(createQuestionsBodySchema))
export class CreateQuestionController {
  constructor(private prisma: PrismaRepository) {}

  @Post()
  async handle(
    @Body()
    body: CreateQuestionsBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, slug } = body

    const question = await this.prisma.createQuestion({
      title,
      slug,
      content,
      authorId: user.sub,
    })

    return question
  }
}
