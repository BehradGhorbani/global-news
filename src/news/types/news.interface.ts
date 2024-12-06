import {NewsModel} from "../model/news.model";
import {CreateNewsDto} from "../dto/create-news.dto";
import {UpdateNewsDto} from "../dto/update-news.dto";

export interface INewsRepository {
    getAllNews(): Promise<NewsModel[]>;
    getNewsById(id: string): Promise<NewsModel | null>;
    createNews(param: CreateNewsDto): Promise<boolean>;
    updateNews(param: UpdateNewsDto): Promise<boolean>;
    deleteNews(id: string, userId: string): Promise<boolean>;
}

export interface IMongoNews{
    _id: Buffer,
    title: string,
    content: string,
    userId: string,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}