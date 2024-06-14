import { Body, Controller, Post, HttpCode, UsePipes } from '@nestjs/common'
import { PrismaRepository } from 'src/prisma/prisma-repository/prisma-repository'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipes'

const createAccountSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
})

type CreateAccounBodySchema = z.infer<typeof createAccountSchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prismaRepository: PrismaRepository) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccounBodySchema) {
    const { email, name, password } = body

    await this.prismaRepository.findByEmail(email)

    const passwordHash = await hash(password, 8)

    await this.prismaRepository.create({ email, name, password: passwordHash })
  }
}
