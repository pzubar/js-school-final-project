import { handleActions } from 'redux-actions';
import { setLoadedData, addForm, addFill, deleteForm } from '../actions';

export const initialState = {
	loadedData: [],
	formsList: [],
	fillsList: [],
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
	},
	initialState,
);
