import { handleActions } from 'redux-actions';
import {
	setLoadedData,
	addForm,
	addFill,
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
		[addFill]: (state, { payload }) => ({
			...state,
			fills: {
				...state.fills,
				[payload.id]: [...payload.id, payload.fieldsList],
			},
			fillsIdsList: [...state.fillsIdsList, payload.id],
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
		[editForm]: (state, { payload }) =>
			console.log(payload) || {
				...state,
				formsList: state.formsList.map(form =>
					form.id === payload.id ? { ...payload } : form,
				),
			},
	},
	initialState,
);
