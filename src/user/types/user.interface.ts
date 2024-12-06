export interface IUserRepository {
    createUser(SignupUserDto): Promise<any>;
    getUserByEmail(email: string): Promise<any | null>;
}

export interface IMongoUser{
    _id: Buffer,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}