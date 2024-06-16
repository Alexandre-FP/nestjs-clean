import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decoretor'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipes'
import { PrismaRepository } from '@/infra/prisma/repositories/prisma-repository'

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
