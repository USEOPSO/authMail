import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/User'
import { JoinRequestDto } from './dto/join.request.dto'
import { Utils } from '../../utils'
import { ChangePwRequestDto } from './dto/login.request.dto'
import { UserContext, ServerDI } from '../../main'
import { ErrorMap } from '../errors'
import { ChkMailRequestDto, MailRequestDto } from './dto/mail.request.dto'
import { MailExpire, MailFormat, MailSubject, MailType } from '../common/mail/mail.const'
import { MailService } from '../common/mail/mail.service'
import { MailLog } from '../common/mail/entities/MailLog'
import { ModifyUserRequestDto } from './dto/modifyUser.request.dto'

let frontUrl: string

@Injectable()
export class UserService {
    constructor(
        private mailService: MailService,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(MailLog) private readonly mailLogsRepository: Repository<MailLog>
    ) {
    }

    async registerUser(data: JoinRequestDto) {
        const {name, email, role, companyName} = data

        const user: User = await this.usersRepository.findOneOrFail({where: {email}}).catch(() => null)

        if (user) {
            Utils.ensure(false, ErrorMap.DuplicateUser)
        }

        const hashedPassword = await Utils.genSaltedPassword(data.password)

        const _user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            companyName,
            role,
        })
        const saveUser = await this.usersRepository.save(_user)

        // 이메일 인증 보내기
        await this.sendMailUser({mailType: MailType.Register, email, userId: saveUser.userId})
        const {password, ...userWithoutPassword} = await this.usersRepository.findOneOrFail({
            where: {userId: saveUser.userId},
        })
        return userWithoutPassword
    }

    async modifyUser(data: ModifyUserRequestDto, userInfo: UserContext) {
        const {email, newPassword, confirmPassword, ...dataRestProperties} = data
        const userId = userInfo.userId
        const user = await this.usersRepository.findOneOrFail({where: {userId}})

        const userInst = this.usersRepository.create(dataRestProperties)

        if (newPassword && confirmPassword) {
            Utils.ensure(newPassword === confirmPassword, ErrorMap.NotMatchPassword)
            const saltedPassword = await Utils.genSaltedPassword(newPassword)
            userInst.password = saltedPassword
        }
        if (email !== user.email) {
            const userEmail = await this.usersRepository.findOneOrFail({where: {email}}).catch(() => null)
            Utils.ensure(!userEmail, ErrorMap.DuplicateUserEmail)
            await this.sendMailUser({mailType: MailType.ChangeEmail, email, userId})
        }
        await this.usersRepository.save({...userInst, userId})
        const {password, ...userRestProperties} = await this.usersRepository.findOneOrFail({
            where: {userId},
        })

        return userRestProperties
    }

    async changePassword(data: ChangePwRequestDto, userInfo: UserContext) {
        const { email, newPassword } = data

        // 비밀번호 변경
        if (newPassword) {
            const hashedPassword = await Utils.genSaltedPassword(newPassword)
            await this.usersRepository.update({ userId: userInfo.userId }, { password: hashedPassword })
            return this.usersRepository.findOneOrFail({ where: { userId: userInfo.userId } })
        } else if (email) {
            // 입력된 email과 db에 있는 email 비교
            const user = await this.usersRepository.findOneOrFail({ where: { email } }).catch(() => null)
            Utils.ensure(user, ErrorMap.WrongEmail)
            // 인증메일 발송
            await this.sendMailUser({ mailType: MailType.ResetPassword, email })
        }

        return { ok: 1 }
    }

    async sendMailUser(data: MailRequestDto) {
        const { email, mailType, userId } = data
        const user = await this.usersRepository.findOneOrFail({ where: { userId: userId } })
        // 이메일 인증을 위한 email + userId 토큰값 생성
        const token = await Utils.genSaltedPassword(email + ',' + user.updatedAt)

        switch (mailType) {
            case MailType.Register:
                const registerMailFormat = MailFormat.Register(frontUrl, token, MailType.Register, user!.name).msg
                await this.mailService.sendMail(
                    email,
                    MailSubject.Register,
                    registerMailFormat,
                    MailType.Register,
                    userId,
                    token
                )
                break
            case MailType.ResetPassword:
                const resetPwMailFormat = MailFormat.ResetPassword(frontUrl, token, MailType.ResetPassword, user!.name).msg
                await this.mailService.sendMail(
                    email,
                    MailSubject.ResetPassword,
                    resetPwMailFormat,
                    MailType.ResetPassword,
                    userId,
                    token
                )
                break
            case MailType.ChangeEmail:
                const changeMailFormat = MailFormat.ChangeEmail(frontUrl, token, MailType.ChangeEmail, user!.name).msg
                await this.mailService.sendMail(
                    email,
                    MailSubject.ChangeEmail,
                    changeMailFormat,
                    MailType.ChangeEmail,
                    userId,
                    token
                )
                break
        }

        return { ok: 1 }
    }

    async authMailUser(mailType: number, token: string) {
        const mailLog = await this.mailLogsRepository.findOneOrFail({ where: { token } }).catch(() => null)
        Utils.ensure(mailLog, ErrorMap.NotFoundMailLog)

        // 인증메일 만료시간 비교
        await this.checkMailExpired({
            mailLogId: mailLog.mailLogId,
            mailType: mailType,
            createAt: mailLog.createdAt,
            updateAt: mailLog.updatedAt,
        })

        if (mailType == MailType.Register) {
            // mailLog 인증확인 isResult 업데이트
            await this.mailLogsRepository.update({ mailLogId: mailLog.mailLogId }, { isResult: true })
            // 유저 메일 인증여부 isValid 업데이트
            await this.usersRepository.update({ userId: mailLog.userId }, { isValid: true })
        } else if (mailType == MailType.ResetPassword) {
            await this.mailLogsRepository.update({ mailLogId: mailLog.mailLogId }, { isResult: true })
        } else if (mailType == MailType.ChangeEmail) {
            await this.mailLogsRepository.update({ mailLogId: mailLog.mailLogId }, { isResult: true })
            await this.usersRepository.update(
                { userId: mailLog.userId },
                { email: mailLog.newEmail, updatedAt: Utils.getNowDate() }
            )
        }

        return { ok: 1 }
    }

    async checkMailExpired(data: ChkMailRequestDto) {
        const { mailLogId, mailType } = data
        const updateAt = data.updateAt.getTime()
        const nowDate = new Date().getTime()

        const mailLog = await this.mailLogsRepository.findOneOrFail({ where: { mailLogId } })

        // 이미 메일 인증이 완료 되었을때
        if (mailLog.isResult) {
            Utils.ensure(false, ErrorMap.WrongAuthMail)
        }
        // MailExpire.Second과 현재 시간을 비교하여 12시간이 초과된 경우 로직 처리
        else if (nowDate - updateAt > MailExpire.Second) {
            if (mailType == MailType.Register) {
                Utils.ensure(false, ErrorMap.RegisterEmailExpired, undefined, mailLog.email)
            } else if (mailType == MailType.ResetPassword) {
                Utils.ensure(false, ErrorMap.ChangPwEmailExpired)
            } else if (mailType == MailType.ChangeEmail) {
                Utils.ensure(false, ErrorMap.RegisterEmailExpired, undefined, mailLog.newEmail)
            }
        }

        return { ok: 1 }
    }

    static setDI(di: ServerDI) {
        frontUrl = di.options.FRONT_URL
    }
}