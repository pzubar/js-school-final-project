import {createAction} from "redux-actions";

export const addField = createAction("CONSTRUCTOR::ADD_FIELD");
export const removeField = createAction("CONSTRUCTOR::REMOVE_FIELD");
export const setName = createAction("CONSTRUCTOR::SET_FORM_NAME");
export const setOptionName = createAction("CONSTRUCTOR::SET_OPTION_NAME");
export const addOption = createAction("CONSTRUCTOR::ADD_OPTION");
export const removeOption = createAction("CONSTRUCTOR::REMOVE_OPTION");
export const changeFieldType = createAction("CONSTRUCTOR::CHANGE_FIELD_TYPE");
export const setFieldLabel = createAction("CONSTRUCTOR::SET_FIELD_LABEL");