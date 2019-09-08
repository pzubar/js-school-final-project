import { handleActions, createAction } from 'redux-actions';
import uid from 'uniqid';
import { initialState, addField, setName } from '../formEditor/editorReducer';
import { CHECK } from '../../constants';

export const setFieldValue = createAction('FILLER::SET_FIELD');

export default handleActions(
	{
		[addField]: (state, { payload }) => {
			const { type } = payload;

			return {
				...state,
				fields: {
					...state.fields,
					[uid()]: {
						...payload,
						value: type === CHECK ? [] : undefined,
					},
				},
			};
		},
		[setName]: (state, { payload }) => ({
			...state,
			name: payload,
		}),
		[setFieldValue]: (state, { payload }) => {
			const { id, value } = payload;
			const { type, value: prevValue } = state.fields[id];
			debugger;
			return {
				...state,
				fields: {
					...state.fields,
					[id]: {
						...state.fields[id],
						value:
							type === CHECK
								? prevValue.includes(value)
									? prevValue.filter(item => item !== value)
									: [...prevValue, value]
								: value,
					},
				},
			};
		},
	},
	initialState,
);
