import { inject, injectable } from 'inversify';
import Redis from 'ioredis';

@injectable()
export class CacheService {
    private _client: any;
    constructor() {}

    init(): void {
        this._client = new Redis({
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
        })
    }

    get client(): Redis{
        return this._client;
    }
}