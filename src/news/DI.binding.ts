import {DiContainer} from "../utils/utils.service";
import {NewsService} from "./service/news.service";
import {NewsRepository} from "./repository/news.repository";

DiContainer.bind(NewsService).toSelf();
DiContainer.bind(NewsRepository).toSelf();
