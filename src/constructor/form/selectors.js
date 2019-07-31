import {initialState} from "./reducer";

export const getFields = state => state.form.fields || [];
export const getName = state => state.form.name || "";
