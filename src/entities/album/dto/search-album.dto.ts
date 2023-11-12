import { IsArray, IsNumber, IsOptional, IsString, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/utility/common/user-status.enum';
import { PageOptionsDto } from 'src/utility/common/pageOptions.dto';


export class SearchAlbumDto extends PageOptionsDto {
    @IsString()
    @IsOptional()
    name? : string

    @IsString()
    @IsOptional()
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
