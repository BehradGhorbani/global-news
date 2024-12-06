import {UserController} from "../user/controllers/user.controller";
import {NewsController} from "../news/controllers/news.controller";

export const controllers = <Function[]>[
    UserController,
    NewsController
]