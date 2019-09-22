import { createSelector } from 'reselect';
import { FORMS, FILLS, FILLS_IDS } from '../constants';

export const getFormsList = state => state.global.formsList || [];
export const getLoadedData = state => state.global.loadedData || [];
export const getFills = state => state.global.fills || {};
export const getFillsIdsList = state => state.global.fillsIdsList || [];
export const getIdFromMatch = (state, { match }) => match.params.id;

export const getAreFormsLoaded = createSelector(
	[getLoadedData],
	loadedData => loadedData.includes(FORMS),
);

export const getAreFillsIdsLoaded = createSelector(
	[getLoadedData],
	loadedData => loadedData.includes(FILLS_IDS),
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

export const getFillsList = createSelector(
	[getAreFormsLoaded, getAreFillsLoaded, getFills, getFormsList],
	(formsLoaded, fillsLoaded, fills, forms) =>
		formsLoaded && fillsLoaded
			? forms
					.map(form => ({
						...form,
						answers: fills[form.id],
					}))
					.filter(form => form.answers)
			: [],
);
