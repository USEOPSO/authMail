import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from '../../entities/CommonEntity'
import { ApiProperty } from '@nestjs/swagger'
import { MailType } from '../mail.const'

@Entity()
export class MailLog extends CommonEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ comment: '메일로그 아이디' })
  readonly mailLogId!: number

  @ApiProperty()
  @Column({ nullable: false, comment: '유저 아이디' })
  userId!: number

  @ApiProperty()
  @Column('varchar', { nullable: false, comment: '유저 이메일' })
  email!: string

  @ApiProperty()
  @Column('varchar', { nullable: true, comment: '변경된 이메일' })
  newEmail?: string

  @ApiProperty()
  @Column('varchar', { nullable: false, comment: 'email + userId token' })
  token!: string

  @ApiProperty()
  @Column({ nullable: false, default: MailType.Register, comment: 'mailFormat type' })
  mailType!: number

  @ApiProperty()
  @Column({ nullable: false, default: false, comment: '인증 결과여부' })
  isResult!: boolean
}
