import {injectable} from 'inversify';
import {Db, Collection, InsertOneResult, ObjectId} from 'mongodb';
import {MongoDbClient} from "../../db/db.service";
import {NewsModel} from "../model/news.model";
import {UpdateNewsDto} from "../dto/update-news.dto";
import {INewsRepository} from "../types/news.interface";
import {CreateNewsDto} from "../dto/create-news.dto";

@injectable()
export class NewsRepository implements INewsRepository {
    private collection: Collection;

    constructor(private dbClient: MongoDbClient) {
        this.collection = dbClient.getDatabase().collection<NewsModel>('news');
    }

    async createNews(param: CreateNewsDto): Promise<boolean> {
        const nowDate = new Date();
        const {title,content,userId} = param;

        const result = await this.collection.insertOne({
            title, content, userId, isDeleted: false, createdAt: nowDate, updatedAt: nowDate
        });
        return !!result.insertedId
    }

    async updateNews(param: UpdateNewsDto): Promise<boolean> {
        const nowDate = new Date();
        const {title,content,id, userId} = param;

        if (!id || !userId) return false;

        const result= await this.collection.updateOne({_id: new ObjectId(id), userId}, {
            $set: {title, content, updatedAt: nowDate}
        });

        return !!result.modifiedCount
    }

    async deleteNews(id: string, userId: string): Promise<boolean> {
        const nowDate = new Date();

        const result= await this.collection.updateOne({_id: new ObjectId(id), userId}, {
            $set: {isDeleted: true, updatedAt: nowDate}
        });

        return !!result.modifiedCount
    }

    async getAllNews(): Promise<any> {
        const news = await this.collection.find({isDeleted: false}).toArray();

        if (!news || news.length === 0) {
            return []
        }

        return news.map(news => {
            return {
                id: news._id.toString(),
                title: news.title,
                content: news.content,
                userId: news.userId,
                isDeleted: news.isDeleted,
                createdAt: news.createdAt,
                updatedAt: news.updatedAt,
            }
        });
    }

    async getNewsById(id: string): Promise<any | null> {
        const news =  await this.collection.findOne({_id: new ObjectId(id), isDeleted: false});

        if (!news) return null;

        return  {
            id: news._id.toString(),
            title: news.title,
            content: news.content,
            userId: news.userId,
            isDeleted: news.isDeleted,
            createdAt: news.createdAt,
            updatedAt: news.updatedAt,
        }
    }
}