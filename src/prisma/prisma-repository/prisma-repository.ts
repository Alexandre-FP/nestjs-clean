import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'

@Injectable()
export class UserPrismaRepository {
  constructor(private userRepository: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await this.userRepository.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new ConflictException('User witch same address allready exist.')
    }

    return user
  }
}
