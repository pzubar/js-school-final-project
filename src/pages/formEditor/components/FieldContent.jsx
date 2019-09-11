import React from 'react';
import { Button, Form, Input, List, Icon } from 'semantic-ui-react';
import FieldOption from './FieldOption';

const FieldContent = props => {
	const {
		id,
		type,
		options = [],
		onOptionAdd,
		onOptionRemove,
		setOptionName,
		label,
	} = props;

	switch (type) {
		case 'input':
		case 'number':
			return (
				<Form.Field
					fluid
					control={Input}
					type={type}
					disabled
					label={label}
				/>
			);
		case 'text':
			return <Form.TextArea disabled label={label} />;
		case 'dropdown':
		case 'radio':
		case 'check':
			return (
				<List>
					{options.map(({ text, value }) => (
						<FieldOption
							key={value}
							fieldId={id}
							name={text}
							value={value}
							onRemove={onOptionRemove}
							length={options.length}
							onNameChange={setOptionName}
						/>
					))}
					<Button
						secondary
						basic
						color="teal"
						fluid
						icon
						name={id}
						onClick={onOptionAdd}
					>
						<Icon name="plus square" />
						Add Option
					</Button>
				</List>
			);
		default:
			throw new Error(`Unexpected field type: ${type}`);
	}
};

export default FieldContent;
