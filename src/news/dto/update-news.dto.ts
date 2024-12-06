import {IsMongoId, IsOptional, IsString} from "class-validator";

export class UpdateNewsDto {
    @IsMongoId()
    @IsString()
    id?: string

    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    content?: string

    userId?: string
}