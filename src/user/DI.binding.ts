import {DiContainer} from "../utils/utils.service";
import {UserService} from "./service/user.service";
import {UserRepository} from "./repository/user.repository";

DiContainer.bind(UserService).toSelf();
DiContainer.bind(UserRepository).toSelf();
