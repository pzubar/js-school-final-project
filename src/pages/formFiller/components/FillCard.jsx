import React from 'react';
import { Form, Input, Select } from 'semantic-ui-react';

const FillCard = props => {
	const { type, label, options } = props;

	switch (type) {
		case 'input':
		case 'number':
			return (
				<Form.Field fluid control={Input} type={type} label={label} />
			);
		case 'text':
			return <Form.TextArea label={label} />;
		case 'dropdown':
			return (
				<Form.Field
					control={Select}
					label={label}
					options={options}
					placeholder={label}
				/>
			);
		default:
			return console.error(`Unexpected field type: ${type}`) || <div />;
	}
};

export default FillCard;
