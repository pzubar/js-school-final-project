import React from 'react';
import { Form, Input, Select } from 'semantic-ui-react';
import { CHECK } from '../../../constants';

const FillCardContent = ({ type, label, options, onChange, value, id }) => {
	switch (type) {
		case 'input':
		case 'number':
			return (
				<Form.Field
					fluid
					control={Input}
					type={type}
					label={label}
					id={id}
					onChange={onChange}
				/>
			);
		case 'text':
			return <Form.TextArea label={label} onChange={onChange} id={id} />;
		case 'dropdown':
			return (
				<Form.Field
					control={Select}
					label={label}
					options={options}
					placeholder={label}
					id={id}
					value={value}
					onChange={onChange}
				/>
			);
		case 'radio':
			return (
				<Form.Group grouped>
					<label>{label}</label>
					{options.map(({ text, value: key }) => (
						<Form.Radio
							onChange={onChange}
							label={text}
							key={key}
							id={id}
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
							onChange={onChange}
							label={text}
							key={key}
							value={key}
							checked={
								Array.isArray(value) && value.includes(key)
							}
							id={id}
						/>
					))}
				</Form.Group>
			);
		default:
			return console.error(`Unexpected field type: ${type}`) || <div />;
	}
};

export default FillCardContent;
