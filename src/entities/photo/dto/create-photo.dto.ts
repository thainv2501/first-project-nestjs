import { IsString } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    name: string;

    @IsString()
    link : string
}
