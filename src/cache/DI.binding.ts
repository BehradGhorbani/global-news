import {DiContainer} from "../utils/utils.service";
import {CacheService} from "./cache.service";

DiContainer.bind(CacheService).toSelf();