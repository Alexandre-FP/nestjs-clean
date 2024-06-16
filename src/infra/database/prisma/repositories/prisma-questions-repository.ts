import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  findById(id: string): Promise<Question | null> {}

  findBySlug(slug: string): Promise<Question | null> {}

  findManyRecent(params: PaginationParams): Promise<Question[]> {}

  save(question: Question): Promise<void> {}

  create(question: Question): Promise<void> {}

  delete(question: Question): Promise<void> {}
}
