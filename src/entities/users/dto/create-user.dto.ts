import { IsNotEmpty , IsString,IsEmail } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({example : "Boipho2k1"})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({example : "BoiPHoCo"})
    @IsNotEmpty()
    @IsString()
    userName: string

    @ApiProperty({example : "123456"})
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty({example :"thainv2501@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string

}
