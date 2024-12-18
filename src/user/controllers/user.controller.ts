import {SignupUserDto} from "../dto/signup-user.dto";
import 'reflect-metadata';
import {inject} from "inversify";
import {BadRequestError, Body, Get, JsonController, Post, Req} from "routing-controllers";
import {UserService} from "../service/user.service";
import {LoginUserDto} from "../dto/login-user.dto";

@JsonController('/user')
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {}

    @Post('/sign-up')
    async signUp(@Body() param: SignupUserDto){
        try {
            return this.userService.signup(param);

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }

    @Post('/login')
    async login(@Body() param: LoginUserDto){
        try {
            return this.userService.login(param);

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }

    @Get('/logout')
    async logout(@Req() req: any){
        try {
            return this.userService.logout(req.headers.authorization);

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }
}