import { ApiProperty } from '@nestjs/swagger'

export class ChangePwRequestDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: '이메일',
    required: false,
  })
  public email: string

  @ApiProperty({
    example: 'password1',
    description: '비밀번호',
    required: false,
  })
  public newPassword: string
}
