import { Album } from 'src/entities/album/entities/album.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create-photo.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/utility/common/user-status.enum';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
    @IsString()
    @IsOptional()
    name : string

    @IsString()
    @IsOptional()
    status : Status

    @IsString()
    @IsOptional()
    albumId : string
}
