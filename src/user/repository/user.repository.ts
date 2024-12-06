import {injectable} from 'inversify';
import {Collection} from 'mongodb';
import {IMongoUser, IUserRepository} from "../types/user.interface";
import {MongoDbClient} from "../../db/db.service";
import {UserModel} from "../model/user.model";
import {SignupUserDto} from "../dto/signup-user.dto";
import {NewsModel} from "../../news/model/news.model";

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
        const user = await this.collection.findOne<IMongoUser>({email});

        if (!user) return null;

        return this.mongoDataAdapter(user);
    }

    mongoDataAdapter(param: IMongoUser): NewsModel {
        return new UserModel(
            param._id.toString(),
            param.name,
            param.email,
            param.password,
            param.createdAt,
            param.updatedAt
        )
    }
}
