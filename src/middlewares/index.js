import {applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {formChangesSaver} from "../pages/formEditor/middlewares";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = store => next => action => {
    console.log(store.getState());

    return next(action)
};

export const middleware = composeEnhancers(applyMiddleware(thunk, logger, formChangesSaver));
