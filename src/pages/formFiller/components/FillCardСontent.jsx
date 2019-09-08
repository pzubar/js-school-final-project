import React, { useCallback } from 'react';
import { Form, Input, Select } from 'semantic-ui-react';
import { CHECK } from '../../../constants';

const FillCardContent = ({ type, label, options, onChange, value, id }) => {
	const onFieldChange = useCallback(
		(event, { value: newValue }) => {
			onChange(id, newValue);
		},
		[id, onChange],
	);
	switch (type) {
		case 'input':
		case 'number':
			return (
				<Form.Field
					fluid
					control={Input}
					type={type}
					label={label}
					onChange={onFieldChange}
				/>
			);
		case 'text':
			return (
				<Form.TextArea label={label} onChange={onFieldChange} id={id} />
			);
		case 'dropdown':
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
		case 'radio':
			return (
				<Form.Group grouped>
					<label>{label}</label>
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
				<Form.Group grouped>
					<label>{label}</label>
					{options.map(({ text, value: key }) => (
						<Form.Checkbox
							onChange={onFieldChange}
							label={text}
							key={key}
							value={key}
							checked={
								Array.isArray(value) && value.includes(key)
							}
						/>
					))}
				</Form.Group>
			);
		default:
			return console.error(`Unexpected field type: ${type}`) || <div />;
	}
};

export default FillCardContent;
