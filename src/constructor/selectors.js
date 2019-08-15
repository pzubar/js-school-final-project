export const getFields = state => state.constructor.fields || {};
export const getFieldsList = state => Object.values(getFields(state));
export const getName = state => state.constructor.name || "";
