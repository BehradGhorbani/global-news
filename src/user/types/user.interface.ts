import {SignupUserDto} from "../dto/signup-user.dto";

export interface IUserRepository {
    createUser(SignupUserDto): Promise<any>;
    getUserByEmail(email: string): Promise<any | null>;
}