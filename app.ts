import {createExpressServer, useContainer} from "routing-controllers";
import {configDotenv} from "dotenv";
import {controllers} from "./src/indexes/controllers.index";
import {ResponseInterceptor} from "./src/response/response.service";
import {DiContainer} from "./src/utils/utils.service";
import {MongoDbClient} from "./src/db/db.service";
import {CacheService} from "./src/cache/cache.service";
import {AuthMiddleware} from "./src/auth/auth.middleware";

configDotenv();
useContainer(DiContainer);

const app = createExpressServer({
    validation: true,
    cors: true,
    interceptors: [ResponseInterceptor as Function],
    controllers,
    middlewares: [AuthMiddleware as Function],
});

const port = process.env.APP_PORT || 3000;
const redisClient = DiContainer.get(CacheService)
const mongoClient = DiContainer.get(MongoDbClient)

redisClient.init();
mongoClient.connect().then(() => {
    console.log('~~~~~~~~+Connection To DB was SuccessFul+~~~~~~~~');

    app.listen(port, () => console.log('Server Is Running on port:', port));
}).catch((e) => console.error(e));

process.on('SIGTERM', async () => {
    await mongoClient.disconnect()
    await redisClient.disconnect()
})