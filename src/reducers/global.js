import { handleActions } from 'redux-actions';
import {
	setLoadedData,
	addForm,
	addFill,
	deleteForm,
	setRedirectUrl,
	addFillId,
} from '../actions';

export const initialState = {
	loadedData: [],
	formsList: [],
	fills: {},
	fillsIdsList: [],
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
			fills: {
				...state.fills,
				[payload.fillId]: [...payload.fillId, payload.fieldsList],
			},
			fillsIdsList: [...state.fillsIdsList, payload.fillId],
		}),
		[deleteForm]: (state, { payload }) => ({
			...state,
			formsList: state.formsList.filter(({ id }) => id !== payload),
		}),
		[setRedirectUrl]: (state, { payload }) => ({
			...state,
			redirectUrl: payload,
		}),
		[addFillId]: (state, { payload }) => ({
			...state,
			fillsIdsList: [...state.fillsIdsList, payload],
		}),
	},
	initialState,
);
