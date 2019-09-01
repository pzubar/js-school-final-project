import { handleActions } from 'redux-actions';
import uid from 'uniqid';
import { initialState } from '../formEditor/reducer';
import { addField, setIsLoaded, setName } from '../formEditor/actions';

export default handleActions(
	{
		[addField]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[uid()]: payload,
			},
		}),
		[setName]: (state, { payload }) => ({
			...state,
			name: payload,
		}),
		[setIsLoaded]: (state, { payload }) => ({
			...state,
			isLoaded: payload,
		}),
	},
	initialState,
);
