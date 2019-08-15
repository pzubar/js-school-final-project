import {handleActions} from "redux-actions";
import {addField, removeField, setName, addOption} from "./actions";
// import { include, exclude } from "../helper";
import uid from 'uniqid';

export const initialState = {
    name: "Unnamed Form",
    fields: {}
};

const form = handleActions(
    {
        [addField]: (state, {payload}) => ({
            ...state,
            fields: {
                ...state.fields,
                [uid()]: payload
            }
        }),
        [removeField]: (state, {payload}) => ({
            // const {[payload]: undefined, ...newStateQuantity} = state.quantity;
            // return {
            //     ...state,
            //     productIds: exclude(state.productIds, payload),
            //     quantity: newStateQuantity
            // };
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
        })
    },
    initialState
);

export default form;
