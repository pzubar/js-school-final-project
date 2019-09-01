import React, { useCallback } from 'react';
import { Button, Form, Input, List, Icon } from 'semantic-ui-react';
import FieldOption from './FieldOption';

const FieldContent = props => {
	const {
		id,
		type,
		options = [],
		addOption,
		removeOption,
		setOptionName,
		label,
	} = props;
	const onOptionAddClick = useCallback(() => addOption(id), [id]);
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
					{options.map(({ name, value }) => (
						<FieldOption
							key={value}
							fieldId={id}
							name={name}
							value={value}
							onRemove={removeOption}
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
						onClick={onOptionAddClick}
					>
						<Icon name="plus square" />
						Add Option
					</Button>
				</List>
			);
		default:
			throw new Error(`Unexpected field type: ${type}`) || <div />;
	}
};

export default FieldContent;
