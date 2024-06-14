import { Prisma, Question, User } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { compare } from 'bcryptjs'

@Injectable()
export class PrismaRepository {
  constructor(private prismaRepository: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await this.prismaRepository.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaRepository.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new ConflictException('User witch same address allready exist.')
    }

    return user
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.prismaRepository.user.findUnique({
      where: {
        email,
      },
    })

    // eslint-disable-next-line prettier/prettier
    if (!user || await compare(password, user.password)) {
      throw new UnauthorizedException('User Credentials do not match')
    }

    return user
  }

  async createQuestion(
    data: Prisma.QuestionUncheckedCreateInput,
  ): Promise<Question> {
    const question = await this.prismaRepository.question.create({
      data,
    })

    return question
  }
}
