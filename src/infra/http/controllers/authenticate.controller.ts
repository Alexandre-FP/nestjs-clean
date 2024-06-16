import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaRepository } from '@/infra/prisma/repositories/prisma-repository'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipes'
import { JwtService } from '@nestjs/jwt'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private prismaRepository: PrismaRepository,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema,
  ) {
    const { email, password } = body

    const user = await this.prismaRepository.login(email, password)

    const acessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: acessToken,
    }
  }
}
