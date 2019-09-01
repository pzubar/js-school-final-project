import { FORMS, FILLS } from '../constants';

export const getLoadedData = state => state.global.loadedData || [];
export const getAreFormsLoaded = state => getLoadedData(state).includes(FORMS);
export const getAreFillsLoaded = state => getLoadedData(state).includes(FILLS);
export const getFormsList = state => state.global.formsList || [];
export const getFillsList = state => state.global.fillsList || [];
