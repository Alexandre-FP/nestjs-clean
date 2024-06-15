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

  async createQuestion(data: Prisma.QuestionUncheckedCreateInput) {
    const question = await this.prismaRepository.question.create({
      data,
    })

    return question
  }

  async fetchRecentQuestion(
    userId: string,
    page: number,
  ): Promise<Question[] | null> {
    const question = await this.prismaRepository.question.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            password: false,
            email: false,
            name: true,
          },
        },
      },
      take: 7, // quantos registro quero mostrar por página
      skip: (page - 1) * 1,
    })

    return question
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const quastionSlug = await this.prismaRepository.question.findUnique({
      where: {
        slug,
      },
    })

    if (quastionSlug) {
      throw new ConflictException('Slug allready exist.')
    }

    return quastionSlug
  }
}
