import {createAction} from "redux-actions";

export const addField = createAction("FORM::ADD");
export const removeField = createAction("FORM::REMOVE");
export const setName = createAction("FORM::SET_NAME");

