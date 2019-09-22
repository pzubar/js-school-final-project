import { handleActions, createAction } from 'redux-actions';
import uid from 'uniqid';
import { setName } from '../formEditor/editorReducer';
import { CHECK } from '../../constants';
import {
	handleMultipleValueChange,
	getDefaultValue,
	checkSomeEmptyValue,
} from '../../helpers';

export const setFieldValue = createAction('FILLER::SET_FIELD');
export const addField = createAction('FILLER::ADD_FIELD');

export default handleActions(
	{
		[addField]: (state, { payload }) => {
			const { type } = payload;
			const id = uid();

			return {
				...state,
				fields: {
					...state.fields,
					[id]: {
						...payload,
						value: getDefaultValue(type),
					},
				},
				fieldsIdsList: [...state.fieldsIdsList, id],
			};
		},
		[setName]: (state, { payload }) => ({
			...state,
			name: payload,
		}),
		[setFieldValue]: (state, { payload }) => {
			const { id, value } = payload;
			const { type, value: prevValue } = state.fields[id];
			const newFields = {
				...state.fields,
				[id]: {
					...state.fields[id],
					value:
						type === CHECK
							? handleMultipleValueChange(prevValue, value)
							: value,
				},
			};

			return {
				...state,
				fields: newFields,
				isSubmitDisabled: checkSomeEmptyValue(Object.values(newFields)),
			};
		},
	},
	{},
);
