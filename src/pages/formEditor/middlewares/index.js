import { addField } from '../actions';

export const formChangesSaver = () => next => action => {
	console.log('Action ', action);
	const result = next(action);
	console.log('New state: ', result);
	// TODO Check if everything in form is OK, then change
	return result;
};

export default formChangesSaver;
