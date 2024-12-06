import {IsEmail, IsString} from "class-validator";

export class LoginUserDto {
    @IsEmail({require_tld: true})
    email?: string

    @IsString()
    password?: string
}
