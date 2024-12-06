import {UpdateNewsDto} from "../dto/update-news.dto";
import 'reflect-metadata';
import {inject} from "inversify";
import {
    BadRequestError,
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
} from "routing-controllers";
import {NewsService} from "../service/news.service";
import {CreateNewsDto} from "../dto/create-news.dto";

@JsonController('/news')
export class NewsController {
    constructor(@inject(NewsService) private userService: NewsService) {}

    @Post('/')
    async createNews(@Body() param: CreateNewsDto, @Req() req: any){
        try {
            return this.userService.createNews({...param, userId: req.user.id});

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }

    @Put('/')
    async updateNews(@Body() param: UpdateNewsDto, @Req() req: any){
        try {
            return this.userService.updateNews({...param, userId: req.user.id});

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }

    @Delete('/:id')
    async deleteNews(@Param('id') id: string, @Req() req: any){
        try {
            return this.userService.deleteNews(id, req.user.id);

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }

    @Get('/all')
    async getAllNews(){
        try {
            return this.userService.getAllNews();

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }

    @Get('/:id')
    async getNewsById(@Param('id') id: string){
        try {
            return this.userService.getNewsById(id);

        } catch (e: any) {
            return new BadRequestError(e.message)
        }
    }
}