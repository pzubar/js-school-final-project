import { createStore } from 'redux';
import reducers from './reducers';
import { middleware } from './middlewares';

const store = createStore(reducers, {}, middleware);

export default store;
