import {DiContainer} from "../utils/utils.service";
import {AuthService} from "./auth.service";
import {AuthMiddleware} from "./auth.middleware";

DiContainer.bind(AuthService).toSelf();
DiContainer.bind(AuthMiddleware).toSelf()