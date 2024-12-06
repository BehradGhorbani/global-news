import {IsString} from "class-validator";

export class SignupUserDto {
    @IsString()
    name?: string

    @IsString()
    email?: string

    @IsString()
    password?: string
}