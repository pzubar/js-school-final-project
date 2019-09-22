import { handleActions, createAction } from 'redux-actions';
import uid from 'uniqid';
import { CHECK, DROPDOWN, INITIAL_FIELD_DATA, RADIO } from '../../constants';

export const addField = createAction('FORM_EDITOR::ADD_FIELD');
export const removeField = createAction('FORM_EDITOR::REMOVE_FIELD');
export const setName = createAction('FORM_EDITOR::SET_FORM_NAME');
export const setOptionName = createAction('FORM_EDITOR::SET_OPTION_NAME');
export const addOption = createAction('FORM_EDITOR::ADD_OPTION');
export const removeOption = createAction('FORM_EDITOR::REMOVE_OPTION');
export const changeFieldType = createAction('FORM_EDITOR::CHANGE_FIELD_TYPE');
export const setFieldLabel = createAction('FORM_EDITOR::SET_FIELD_LABEL');
export const setIsLoaded = createAction('FORM_EDITOR::SET_IS_LOADED');

export const initialState = {
	name: 'Unnamed Form',
	fields: {},
	fieldsIdsList: [],
	isSubmitDisabled: true,
};

export default handleActions(
	{
		[addField]: (state, { payload = INITIAL_FIELD_DATA }) => ({
			...state,
			fields: {
				...state.fields,
				[uid()]: payload,
			},
		}),
		[removeField]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[payload]: undefined,
			},
		}),
		[setName]: (state, { payload }) => ({
			...state,
			name: payload,
		}),
		[addOption]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[payload]: {
					...state.fields[payload],
					options: [
						...state.fields[payload].options,
						{
							text: `Option ${state.fields[payload].options
								.length + 1}`,
							value: uid(),
						},
					],
				},
			},
		}),
		[removeOption]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[payload.id]: {
					...state.fields[payload.id],
					options: state.fields[payload.id].options.filter(
						({ value }) => value !== payload.value,
					),
				},
			},
		}),
		[setOptionName]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[payload.id]: {
					...state.fields[payload.id],
					options: state.fields[payload.id].options.map(option =>
						option.value === payload.value
							? { ...option, text: payload.name }
							: option,
					),
				},
			},
		}),
		[changeFieldType]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[payload.id]: {
					...state.fields[payload.id],
					type: payload.value,
					options: [DROPDOWN, CHECK, RADIO].includes(payload.value)
						? state.fields[payload.id].options || [
								{
									text: 'Option 1',
									value: uid(),
								},
						  ]
						: [],
				},
			},
		}),
		[setFieldLabel]: (state, { payload }) => ({
			...state,
			fields: {
				...state.fields,
				[payload.id]: {
					...state.fields[payload.id],
					label: payload.value,
				},
			},
		}),
		[setIsLoaded]: (state, { payload }) => ({
			...state,
			isLoaded: payload,
		}),
	},
	initialState,
);
