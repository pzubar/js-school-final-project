import {createStore} from "redux";
import reducers from "./reducers";
import {middleware} from "./middlewares";

export const store = createStore(reducers, {}, middleware);
