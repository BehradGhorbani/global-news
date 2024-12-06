import {IsEmail, IsString} from "class-validator";

export class CreateNewsDto {
    @IsString()
    title?: string

    @IsString()
    content?: string

    userId?: string
}
