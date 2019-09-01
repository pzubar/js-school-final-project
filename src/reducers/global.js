import { handleActions } from 'redux-actions';
import {
	setLoadedData,
	addForm,
	addFill,
	deleteForm,
	setIsRedirectNeeded,
} from '../actions';

export const initialState = {
	loadedData: [],
	formsList: [],
	fillsList: [],
	isRedirectNeeded: false,
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
		[setIsRedirectNeeded]: (state, { payload }) => ({
			...state,
			isRedirectNeeded: payload,
		}),
	},
	initialState,
);
