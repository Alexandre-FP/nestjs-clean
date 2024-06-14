import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { PrismaRepository } from 'src/prisma/prisma-repository/prisma-repository'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes'
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
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const user = await this.prismaRepository.login(email, password)

    const acessToken = this.jwt.sign({ sub: user.id })

    console.log(acessToken)

    return {
      access_token: acessToken,
    }
  }
}
