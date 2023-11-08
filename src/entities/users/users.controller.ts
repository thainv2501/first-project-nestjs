import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { ChangeUserPasswordDto } from './dto/change-password-user.dto';
import { ApiCreatedResponse , ApiBadRequestResponse } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({description : "create user successful !"})
  @ApiBadRequestResponse({description : "create user fail ! duplicated ,..."})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('verify')
  @ApiCreatedResponse({description : "verify user successful !"})
  @ApiBadRequestResponse({description : "verify user fail !  ,..."})
  verifyUser(@Body() verifyUserDto : VerifyUserDto){
    return this.usersService.verifyUser(verifyUserDto)
  }

  @Get('getResetPasswordToken')
  @ApiCreatedResponse({description : "get a token !"})
  @ApiBadRequestResponse({description : "create token fail !  ,..."})
  getResetPasswordToken(@Body('email') email: string){
    return this.usersService.getResetPasswordToken(email)
  }

  @Patch('resetPassword')
  @ApiCreatedResponse({description : "reset user password successful !"})
  @ApiBadRequestResponse({description : "reset user password  fail !  ,..."})
  resetPassword(@Body() resetPasswordUserDto: ResetPasswordUserDto){
    return this.usersService.resetPassword(resetPasswordUserDto)
  }



  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id : string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('changePassword/:id')
  changePassword(@Param('id') id : string, @Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    return this.usersService.changePassword(id, changeUserPasswordDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
