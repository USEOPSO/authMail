import { BeforeInsert, BeforeUpdate, Column } from 'typeorm'
import { Utils } from '../../../utils'
import { ApiProperty } from '@nestjs/swagger'

export class CommonEntity {
  @ApiProperty()
  @Column({ type: 'datetime', comment: '생성 시각' })
  createdAt!: Date
  @ApiProperty()
  @Column({ type: 'datetime', comment: '업데이트 시각' })
  updatedAt!: Date

  @BeforeInsert()
  updateDatesForInsert() {
    const now = Utils.getNowDate()
    this.createdAt = now
    this.updatedAt = now
  }

  @BeforeUpdate()
  updateDatesForUpdate() {
    this.updatedAt = Utils.getNowDate()
  }
}
