export const getFields = state => state.formEditor.fields || {};
export const getFieldsList = state => Object.values(getFields(state));
export const getName = state => state.formEditor.name || '';
export const getIsLoaded = state => state.formEditor.isLoaded;
