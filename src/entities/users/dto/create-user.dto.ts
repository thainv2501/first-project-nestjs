import { IsNotEmpty , IsString,IsEmail } from "class-validator"
import { Status } from "src/utility/common/user-status.enum"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string

}
