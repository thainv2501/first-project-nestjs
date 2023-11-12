import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Status } from 'src/utility/common/user-status.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({example : "boiphoV2"})
    @IsString()
    name?: string

    @ApiProperty({example : "Nickname"})
    @IsString()
    userName?: string

    @ApiProperty({ enum: [Status.Active , Status.Inactive]})
    @IsOptional()
    status?: Status

}
