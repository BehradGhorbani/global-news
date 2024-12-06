import {DiContainer} from "../utils/utils.service";
import {MongoDbClient} from "./db.service";

DiContainer.bind(MongoDbClient).toSelf();