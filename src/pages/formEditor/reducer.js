import {handleActions} from "redux-actions";
import {
    addField,
    removeField,
    setName,
    addOption,
    removeOption,
    changeFieldType,
    setOptionName,
    setFieldLabel,
    setIsLoaded
} from "./actions";
import uid from 'uniqid';
import {INITIAL_FIELD_DATA} from "./constants";

export const initialState = {
    name: "Unnamed Form",
    isLoaded: false,
    fields: {}
};

export default handleActions(
    {
        [addField]: (state, {payload = INITIAL_FIELD_DATA}) => ({
            ...state,
            fields: {
                ...state.fields,
                [uid()]: payload
            }
        }),
        [removeField]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [payload]: undefined
            }
        }),
        [setName]: (state, {payload}) => ({
            ...state,
            name: payload
        }),
        [addOption]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [payload]: {
                    ...state.fields[payload],
                    options: [...state.fields[payload].options,
                        {
                            name: "Option " + (state.fields[payload].options.length + 1),
                            value: uid()
                        }]
                }
            }
        }),
        [removeOption]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [payload.id]: {
                    ...state.fields[payload.id],
                    options: state.fields[payload.id].options
                        .filter(({value}) => value !== payload.value),
                }
            }
        }),
        [setOptionName]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [payload.id]: {
                    ...state.fields[payload.id],
                    options: state.fields[payload.id].options
                        .map(option => option.value === payload.value ?
                            {...option, name: payload.name} : option),
                }
            }
        }),
        [changeFieldType]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [payload.id]: {
                    ...state.fields[payload.id],
                    type: payload.value,
                    options: ["dropdown", "check", "radio"].includes(payload.value) ?
                        state.fields[payload.id].options || [{
                            name: "Option 1",
                            value: uid()
                        }] : []
                }
            }
        }),
        [setFieldLabel]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [payload.id]: {
                    ...state.fields[payload.id],
                    label: payload.value
                }
            }
        }),
        [setIsLoaded]: (state, {payload}) => ({
            ...state,
            isLoaded: payload
        }),
    },
    initialState
);
