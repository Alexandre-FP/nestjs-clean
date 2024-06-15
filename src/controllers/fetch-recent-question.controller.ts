import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser } from 'src/auth/current-user-decoretor'
import { UserPayload } from 'src/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes'
import { PrismaRepository } from 'src/prisma/prisma-repository/prisma-repository'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParammSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQurstionController {
  constructor(private prisma: PrismaRepository) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParammSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const question = await this.prisma.fetchRecentQuestion(user.sub, page)

    return {
      question,
    }
  }
}
