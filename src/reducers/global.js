import { handleActions } from 'redux-actions';
import {
	setLoadedData,
	addForm,
	addFills,
	deleteForm,
	setRedirectUrl,
	addFillId,
	editForm,
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
		[addFills]: (state, { payload }) => ({
			...state,
			fills: payload,
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
		[editForm]: (state, { payload }) => ({
			...state,
			formsList: state.formsList.map(form =>
				form.id === payload.id ? { ...payload } : form,
			),
		}),
	},
	initialState,
);
