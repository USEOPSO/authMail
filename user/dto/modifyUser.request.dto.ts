import { ApiProperty } from '@nestjs/swagger'

export class ModifyUserRequestDto {
  @ApiProperty({
    example: 'test',
    description: '이름',
    required: true,
  })
  public name?: string

  @ApiProperty({
    example: 'test',
    description: '회사명',
    required: true,
  })
  public companyName?: string

  @ApiProperty({
    example: 0,
    description: '권한',
    required: true,
  })
  public role?: number

  @ApiProperty({
    example: 'test@gmail.com',
    description: '이메일',
    required: true,
  })
  public email?: string

  @ApiProperty({
    example: 'password1',
    description: '비밀번호',
    required: true,
  })
  public newPassword?: string

  @ApiProperty({
    example: 'password1',
    description: '비밀번호 검증',
    required: true,
  })
  public confirmPassword?: string
}
