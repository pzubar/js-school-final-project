import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = () => next => action => {
	// console.log(store.getState());

	return next(action);
};

export const middleware = composeEnhancers(applyMiddleware(thunk, logger));

export default middleware;
