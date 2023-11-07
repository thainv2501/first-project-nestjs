import { IsNotEmpty , IsString,IsEmail } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';


export class SignInUserDto {
    @ApiProperty({example : "thainv2501@gmail.com"})
    @IsNotEmpty()
    loginName: string

    @ApiProperty({example : "123456"})
    @IsNotEmpty()
    @IsString()
    password: string

}
