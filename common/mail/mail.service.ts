import { Injectable } from '@nestjs/common'
import { ServerDI } from '../../../main'
import * as nodemailer from 'nodemailer'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MailLog } from './entities/MailLog'
import { MailType } from './mail.const'
import { User } from '../../user/entities/User'

let user: string
let clientId: string
let clientSecret: string
let refreshToken: string

let transporter: nodemailer.Transporter

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(MailLog) private readonly mailLogRepository: Repository<MailLog>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  static setDI(di: ServerDI) {
    user = di.options.MAIL_ADDRESS
    clientId = di.options.MAIL_CLI_ID
    clientSecret = di.options.MAIL_CLI_SECRET
    refreshToken = di.options.MAIL_REFRESH_TOKEN

    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: user,
        clientId,
        clientSecret,
        refreshToken,
      },
    })
  }

  async sendMail(to: string, subject: string, html: string, type: number, userId?: number, token?: string) {
    await transporter.sendMail({
      from: `'Support Team <${user}>'`,
      to,
      subject: `${subject}`,
      html: html,
    })
    transporter.close()
    const _user = await this.userRepository.findOneOrFail({ where: { userId } })
    const mailInst = this.mailLogRepository.create({
      userId,
      email: _user.email,
      token: token,
      mailType: type,
    })
    if (type === MailType.ChangeEmail) {
      mailInst.newEmail = to
    }
    await this.mailLogRepository.save(mailInst)
    return { ok: 1 }
  }
}
