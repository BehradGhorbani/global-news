import {Container} from "inversify";

export const DiContainer = new Container({
    defaultScope: "Singleton",
    autoBindInjectable: true
});