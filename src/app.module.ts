import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { PrismaService } from './prisma/prisma.service'
import { UserPrismaRepository } from './prisma/prisma-repository/prisma-repository'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService, UserPrismaRepository],
})
export class AppModule {}
