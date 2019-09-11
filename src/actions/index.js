import { createAction } from 'redux-actions';

export const setLoadedData = createAction('GLOBAL::SET_LOADED_DATA');
export const addForm = createAction('GLOBAL::ADD_FORM');
export const addFill = createAction('GLOBAL::ADD_FILL');
export const deleteForm = createAction('GLOBAL::DELETE_FORM');
export const setRedirectUrl = createAction('GLOBAL::SET_REDIRECT');
export const addFillId = createAction('GLOBAL::ADD_FILL_ID');
