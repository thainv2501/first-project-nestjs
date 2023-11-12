import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { baseEntity } from 'src/utility/common/base.entity';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;
}
