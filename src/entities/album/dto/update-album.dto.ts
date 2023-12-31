import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/utility/common/user-status.enum';
import { Photo } from 'src/entities/photo/entities/photo.entity';
import { User } from 'src/entities/users/entities/user.entity';
import { Type } from 'class-transformer';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    @IsString()
    name? : string

    @IsString()
    description?: string

    @ApiProperty({ enum: [Status.Active , Status.Inactive]})
    @IsOptional()
    @IsString()
    status?: Status

    @IsOptional()
    @IsArray()
    photos? : string[]

    @IsOptional()
    @IsArray()
    users? : string[]

    @IsOptional()
    @IsString()
    photo : string

    @IsOptional()
    @IsString()
    user : string
}
