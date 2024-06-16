import { Module } from '@nestjs/common'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQurstionController } from './controllers/fetch-recent-question.controller'
import { DataBaseModule } from '../database/database.module'

@Module({
  imports: [DataBaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQurstionController,
  ],
})
export class HttpModules {}
