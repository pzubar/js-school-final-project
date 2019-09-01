import { combineReducers } from 'redux';
import formEditor from '../pages/formEditor/reducer';
import global from './global';

const reducers = combineReducers({
	formEditor,
	global,
});

export default reducers;
