import { Body, Controller, Get, Post, Req, Response, Query, Put } from '@nestjs/common'
import { JoinRequestDto } from './dto/join.request.dto'
import { UserService } from './user.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserAuthRole } from '../common/auth/role.const'
import { ChangePwRequestDto } from './dto/login.request.dto'
import { UserInfo } from '../common/decorator/user.decorator'
import { Roles } from '../common/decorator/roles.decorator'
import { UserContext } from '../../main'
import { MailRequestDto } from './dto/mail.request.dto'
import { ModifyUserRequestDto } from './dto/modifyUser.request.dto'

@ApiTags('유저 API')
@Controller('users')
export class UserController {
    constructor(private usersService: UserService) {
    }

    @ApiOperation({summary: '유저 회원가입'})
    @Post()
    async registerUser(@Body() data: JoinRequestDto) {
        return this.usersService.registerUser(data)
    }

    @ApiOperation({summary: '유저정보 변경'})
    @Roles(UserAuthRole.User)
    @Put()
    async modifyUser(@Body() data: ModifyUserRequestDto, @UserInfo() userInfo: UserContext) {
        return this.usersService.modifyUser(data, userInfo)
    }

    @ApiOperation({summary: '비밀번호 찾기'})
    @Roles(UserAuthRole.User)
    @Post('changePassword')
    async changePassword(@Body() data: ChangePwRequestDto, @UserInfo() userInfo: UserContext) {
        return this.usersService.changePassword(data, userInfo)
    }

    @ApiOperation({summary: '회원가입, 비밀번호 초기화, 메일변경시 메일전송_RESEND'})
    @Post('sendMailUser')
    async sendMailUser(@Body() data: MailRequestDto) {
        return this.usersService.sendMailUser(data)
    }

    @ApiOperation({summary: '메일 인증'})
    @Get('authMailUser')
    async authMailUser(@Query('mailType') mailType: number, @Query('token') token: string) {
        return this.usersService.authMailUser(mailType, token)
    }
}