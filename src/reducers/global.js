import { handleActions } from 'redux-actions';
import {
	setLoadedData,
	addForm,
	addFill,
	deleteForm,
	setRedirectUrl,
} from '../actions';

export const initialState = {
	loadedData: [],
	formsList: [],
	fillsList: [],
	redirectUrl: '',
};

export default handleActions(
	{
		[setLoadedData]: (state, { payload }) => ({
			...state,
			loadedData: [...state.loadedData, payload],
		}),
		[addForm]: (state, { payload }) => ({
			...state,
			formsList: [...state.formsList, payload],
		}),
		[addFill]: (state, { payload }) => ({
			...state,
			fillsList: [...state.fillsList, payload],
		}),
		[deleteForm]: (state, { payload }) => ({
			...state,
			formsList: state.formsList.filter(({ id }) => id !== payload),
		}),
		[setRedirectUrl]: (state, { payload }) => ({
			...state,
			redirectUrl: payload,
		}),
	},
	initialState,
);
