import { CHECK, DELIMITER } from '../constants';

export const handleMultipleValueChange = (prevValuesList, value) =>
	prevValuesList.includes(value)
		? prevValuesList.filter(item => item !== value)
		: [...prevValuesList, value];

export const checkSomeEmptyValue = fieldsList =>
	fieldsList.some(
		({ value }) => !value || (Array.isArray(value) && !value.length),
	);

export const getDefaultValue = fieldType => (fieldType === CHECK ? [] : '');

export const getFillId = (id, name) =>
	`${encodeURIComponent(name)}${DELIMITER}${id}`;
