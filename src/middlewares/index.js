import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const nodeEnv = process.env.NODE_ENV;
const composeEnhancers =
	(nodeEnv === 'development' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const middleware = composeEnhancers(applyMiddleware(thunk));

export default middleware;
