export const getFields = state => state.formConstructor.fields || {};
export const getFieldsList = state => Object.values(getFields(state));
export const getName = state => state.formConstructor.name || "";
