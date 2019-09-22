import React, { useCallback } from 'react';
import { Form, Input, Select } from 'semantic-ui-react';
import {
	CHECK,
	DROPDOWN,
	INPUT,
	NUMBER,
	RADIO,
	TEXT,
} from '../../../constants';

const FillCardContent = ({ onChange, id, fieldData }) => {
	const { type, label, value, options } = fieldData;
	const onFieldChange = useCallback(
		(event, { value: newValue }) => onChange(id, newValue),
		[id, onChange],
	);

	switch (type) {
		case INPUT:
		case NUMBER:
			return (
				<Form.Field
					fluid
					control={Input}
					type={type}
					label={label}
					value={value}
					onChange={onFieldChange}
				/>
			);
		case TEXT:
			return (
				<Form.TextArea
					value={value}
					label={label}
					onChange={onFieldChange}
				/>
			);
		case DROPDOWN:
			return (
				<Form.Field
					control={Select}
					label={label}
					options={options}
					placeholder={label}
					value={value}
					onChange={onFieldChange}
				/>
			);
		case RADIO:
			return (
				<Form.Group grouped id={id}>
					<label htmlFor={id}>{label}</label>
					{options.map(({ text, value: key }) => (
						<Form.Radio
							onChange={onFieldChange}
							label={text}
							key={key}
							value={key}
							checked={key === value}
						/>
					))}
				</Form.Group>
			);
		case CHECK:
			return (
				<Form.Group grouped id={id}>
					<label htmlFor={id}>{label}</label>
					{options.map(({ text, value: key }) => (
						<Form.Checkbox
							onChange={onFieldChange}
							label={text}
							key={key}
							value={key}
							checked={value.includes(key)}
						/>
					))}
				</Form.Group>
			);
		default:
			throw Error('Unexpected field type passed');
	}
};

export default FillCardContent;
