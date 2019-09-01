import { createAction } from 'redux-actions';

export const addField = createAction('FORM_EDITOR::ADD_FIELD');
export const removeField = createAction('FORM_EDITOR::REMOVE_FIELD');
export const setName = createAction('FORM_EDITOR::SET_FORM_NAME');
export const setOptionName = createAction('FORM_EDITOR::SET_OPTION_NAME');
export const addOption = createAction('FORM_EDITOR::ADD_OPTION');
export const removeOption = createAction('FORM_EDITOR::REMOVE_OPTION');
export const changeFieldType = createAction('FORM_EDITOR::CHANGE_FIELD_TYPE');
export const setFieldLabel = createAction('FORM_EDITOR::SET_FIELD_LABEL');
export const setIsLoaded = createAction('FORM_EDITOR::SET_IS_LOADED');
