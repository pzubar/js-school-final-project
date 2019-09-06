import { createSelector } from 'reselect';
import { FORMS, FILLS } from '../constants';

export const getFormsList = state => state.global.formsList || [];
export const getLoadedData = state => state.global.loadedData || [];
export const getFillsList = state => state.global.fillsList || [];
export const getIdFromMatch = (state, { match }) => match.params.id;

export const getAreFormsLoaded = createSelector(
	[getLoadedData],
	loadedData => loadedData.includes(FORMS),
);

export const getAreFillsLoaded = createSelector(
	[getLoadedData],
	loadedData => loadedData.includes(FILLS),
);

export const getIsFormLoaded = createSelector(
	[getFormsList, getIdFromMatch],
	(formsList, id) => Boolean(id) && formsList.some(form => form.id === id),
);
export const getFormData = createSelector(
	[getFormsList, getIdFromMatch],
	(formsList, id) => formsList.find(form => form.id === id),
);
