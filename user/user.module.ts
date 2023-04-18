import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/User'
import { MailLog } from '../common/mail/entities/MailLog'
import { MailService } from '../common/mail/mail.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, MailLog])],
    providers: [UserService, MailService],
    exports: [UserService, MailService],
    controllers: [UserController],
})
export class UserModule {}
