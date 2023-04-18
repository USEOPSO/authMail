import { ApiProperty } from '@nestjs/swagger'

export class MailRequestDto {
  public userId?: number

  @ApiProperty({
    example: 'test@gmail.com',
    description: '이메일',
    required: true,
  })
  public email?: string

  @ApiProperty({
    example: 0,
    description: '전송메일 type',
    required: true,
  })
  public mailType?: number
}

export class ChkMailRequestDto {
  public mailLogId?: number

  public mailType?: number

  public createAt?: Date

  public updateAt?: Date
}
