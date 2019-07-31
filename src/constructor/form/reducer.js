import {handleActions} from "redux-actions";
import {addField, removeField, setName} from "./actions";
// import { include, exclude } from "../helper";

export const initialState = {
    name: "Unnamed Form",
    fields: [{type: "input"}, {type: "select"}, {type: "radio"}]
};

const form = handleActions(
    {
        [addField]: (state, {payload}) => ({
            ...state,
            // productIds: include(state.productIds, payload),
            fields: [
                ...state.fields,
                payload
            ]
        }),
        [removeField]: (state, {payload}) => ({
            // const {[payload]: undefined, ...newStateQuantity} = state.quantity;
            // return {
            //     ...state,
            //     productIds: exclude(state.productIds, payload),
            //     quantity: newStateQuantity
            // };
            ...state,
            fields: state.fields.filter(field => field !== payload)
        }),
        [setName]: (state, {payload}) => ({
            ...state,
            name: payload
        })
        // [incQuantity]: (state, {payload}) => ({
        //     ...state,
        //     quantity: {
        //         ...state.quantity,
        //         [payload]: state.quantity[payload] + 1
        //     }
        // }),
        // [decQuantity]: (state, {payload}) => ({
        //     ...state,
        //     quantity: {
        //         ...state.quantity,
        //         [payload]: state.quantity[payload] - 1
        //     }
        // })
    },
    initialState
);

export default form;
