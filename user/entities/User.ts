import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from '../../account/entities/Account'
import { ApiProperty } from '@nestjs/swagger'

@Index('email', ['email'], { unique: true })
@Entity()
export class User extends Account {
  @ApiProperty()
  @PrimaryGeneratedColumn({ comment: '유저아이디' })
  readonly userId!: number

  @ApiProperty()
  @Column('varchar', { comment: '이름', length: 30 })
  name: string

  @ApiProperty()
  @Column('varchar', { comment: '회사명', length: 30 })
  companyName: string

  @ApiProperty()
  @Column({ comment: 'Role', nullable: false })
  role: number

  @ApiProperty()
  @Column({ comment: '삭제된 경우 삭제된 시각', nullable: true, type: 'datetime' })
  deletedAt?: Date

  @ApiProperty()
  @Column({ comment: '이메일 인증여부', nullable: false, default: false })
  isValid!: boolean
}
