import { ApiProperty } from '@nestjs/swagger'

export class JoinRequestDto {
  @ApiProperty({
    example: 'qwerty@abc.com',
    description: 'email',
    required: true,
  })
  public email: string

  @ApiProperty({
    example: 'test',
    description: 'name',
    required: true,
  })
  public name: string

  @ApiProperty({
    example: 'test',
    description: 'companyName',
    required: true,
  })
  public companyName: string

  @ApiProperty({
    example: 'test',
    description: 'password',
    required: true,
  })
  public password: string

  @ApiProperty({
    example: 0,
    description:
      '  Engineering: 0,\n' + '  Executive: 1,\n' + '  Other: 2,\n' + '  Product: 3,\n' + '  StudentResearcher: 4,',
    required: true,
  })
  public role: number
}
