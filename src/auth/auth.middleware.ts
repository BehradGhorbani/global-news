import {ExpressMiddlewareInterface, Middleware, UnauthorizedError} from 'routing-controllers';
import jwt from 'jsonwebtoken';
import {inject} from "inversify";
import {AuthService} from "./auth.service";
import {CacheService} from "../cache/cache.service";
import {whiteListRoutes} from "../utils/utils.constant";

@Middleware({type: 'before'})
export class AuthMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(AuthService) private authService: AuthService,
                @inject(CacheService) private cacheService: CacheService) {
    }
    async use(req: any, res: any, next: (err?: any) => any): Promise<void> {
        try {
            if (!whiteListRoutes.includes(req.url)) {
                const authHeader: string = req.headers.authorization;
                if (!authHeader) {
                    throw new Error('Authorization header missing or malformed');
                }

                const token = authHeader.replace('Bearer ', '');

                const session = await this.cacheService.client.get(token);

                if (!session) {
                    throw new UnauthorizedError('Token is Invalid Or Expired!')
                }

                req.headers.authorization = token;
                req.user = session;
            }

            next();
        } catch (error: any) {
            res.status(401).json({ error: 'Unauthorized', message: error.message});
        }
    }
}