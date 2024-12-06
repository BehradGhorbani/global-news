import {inject, injectable} from "inversify";
import {UpdateNewsDto} from "../dto/update-news.dto";
import {NewsRepository} from "../repository/news.repository";
import {CacheService} from "../../cache/cache.service";
import {CreateNewsDto} from "../dto/create-news.dto";
import {AuthService} from "../../auth/auth.service";
import {NewsModel} from "../model/news.model";
import {ForbiddenError} from "routing-controllers";

@injectable()
export class NewsService {
    constructor(@inject(NewsRepository) private newsRepository: NewsRepository,
                @inject(CacheService) private cacheService: CacheService,
                @inject(AuthService) private authService: AuthService) {
    }

    async createNews(param: CreateNewsDto): Promise<boolean> {
        return await this.newsRepository.createNews(param);
    }

    async updateNews(param: UpdateNewsDto): Promise<boolean> {
        const result = await this.newsRepository.updateNews(param);

        if (!result) {
            throw new Error('Record Not Found or Access denied')
        }

        return result
    }

    async deleteNews(id: string, userId?: string): Promise<boolean> {
        if (!userId) return false;

        const result =  await this.newsRepository.deleteNews(id, userId);

        if (!result) {
            throw new Error('Record Not Found or Access denied')
        }

        return result
    }

    async getAllNews(): Promise<NewsModel[]> {
        return await this.newsRepository.getAllNews();
    }

    async getNewsById(id: string): Promise<NewsModel | null> {
        return await this.newsRepository.getNewsById(id);
    }
}