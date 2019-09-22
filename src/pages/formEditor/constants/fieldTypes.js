import {
	CHECK,
	DROPDOWN,
	INPUT,
	NUMBER,
	RADIO,
	TEXT,
} from '../../../constants';

const FIELD_TYPES = [
	{
		key: INPUT,
		text: 'Input',
		value: INPUT,
		icon: 'i cursor',
	},
	{
		key: NUMBER,
		text: 'Number',
		value: NUMBER,
		icon: 'sort numeric down',
	},
	{
		key: TEXT,
		text: 'Text',
		value: TEXT,
		icon: 'align justify',
	},
	{
		key: DROPDOWN,
		text: 'Dropdown',
		value: DROPDOWN,
		icon: 'filter',
	},
	{
		key: CHECK,
		text: 'Checkbox',
		value: CHECK,
		icon: 'checkmark box',
	},
	{
		key: RADIO,
		text: 'Radio',
		value: RADIO,
		icon: 'list',
	},
];

export default FIELD_TYPES;
