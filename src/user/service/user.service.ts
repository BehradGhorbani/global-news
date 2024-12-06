import {inject, injectable} from "inversify";
import {SignupUserDto} from "../dto/signup-user.dto";
import {UserRepository} from "../repository/user.repository";
import {CacheService} from "../../cache/cache.service";
import {compare, genSalt, hash} from "bcrypt";
import process from "process";
import {LoginUserDto} from "../dto/login-user.dto";
import {AccessTokenResponseType} from "../types/user.types";
import {UnauthorizedError} from "routing-controllers";
import {AuthService} from "../../auth/auth.service";

@injectable()
export class UserService {
    constructor(@inject(UserRepository) private userRepository: UserRepository,
                @inject(CacheService) private cacheService: CacheService,
                @inject(AuthService) private authService: AuthService) {
    }

    async signup(param: SignupUserDto): Promise<string> {
        if (!param.email || !param.password || !param.name) {
            throw new Error('SignUp Params Missing');
        }

        const isEmailExists = param.email && await this.userRepository.getUserByEmail(param.email);

        if (isEmailExists) {
            throw new Error('A User With This Email Already Exists.');
        }

        const hashSalt = await genSalt();
        const encPass = await hash(param.password, hashSalt);
        const user = await this.userRepository.createUser(
            { ...param, password: encPass },
        );

        return 'Account creation was Successful'
    }

    async login(param: LoginUserDto): Promise<AccessTokenResponseType> {
        if (!param.email || !param.password) {
            throw new Error('Login Params Missing');
        }

        const user = await this.userRepository.getUserByEmail(param.email);
        if (!user) {
            throw new UnauthorizedError();
        }

        const isPassCorrect = user.password && await compare(param.password, user.password);

        if (!isPassCorrect) {
            throw new UnauthorizedError();
        }

        const jwtExpiresAt = Number(process.env.JWT_EXPIRES_AT);

        const accessToken = await this.authService.signToken({
            id: user.id,
            email: user.email,
            expiresAt: jwtExpiresAt,
        });

        await this.cacheService.client.set(accessToken, JSON.stringify(user), "EX", jwtExpiresAt);
        return {
            accessToken,
            expiresAt: jwtExpiresAt,
        };
    }

    async logout(token: string): Promise<boolean> {
        const result = await this.cacheService.client.del(token);

        return !!result
    }
}