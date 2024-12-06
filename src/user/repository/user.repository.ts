import {injectable} from 'inversify';
import {Db, Collection, InsertOneResult} from 'mongodb';
import {IUserRepository} from "../types/user.interface";
import {MongoDbClient} from "../../db/db.service";
import {UserModel} from "../model/user.model";
import {SignupUserDto} from "../dto/signup-user.dto";

@injectable()
export class UserRepository implements IUserRepository {
    private collection: Collection;

    constructor(private dbClient: MongoDbClient) {
        this.collection = dbClient.getDatabase().collection<UserModel>('users');
    }

    async createUser(param: SignupUserDto): Promise<boolean> {
        const nowDate = new Date();
        const {email, password, name} = param;

        const result = await this.collection.insertOne({
            email, password, name, createdAt: nowDate, updatedAt: nowDate
        });
        return result.acknowledged
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        return await this.collection.findOne<UserModel>({email});
    }
}
