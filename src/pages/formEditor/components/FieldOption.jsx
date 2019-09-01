import React, { useCallback } from 'react';
import { Button, Input, List } from 'semantic-ui-react';

const FieldOption = props => {
	const { name, value, onRemove, onNameChange, length, fieldId } = props;
	const onRemoveClick = useCallback(
		() =>
			onRemove({
				id: fieldId,
				value,
			}),
		[fieldId, value],
	);
	const onNameInputChange = useCallback(
		(event, { value: newName }) => {
			onNameChange({ id: fieldId, value, name: newName });
		},
		[fieldId, value],
	);

	return (
		<List.Item key={value}>
			{length !== 1 && (
				<List.Content floated="right">
					<Button onClick={onRemoveClick}>X</Button>
				</List.Content>
			)}
			<List.Item>
				<Input
					error={!name}
					fluid
					value={name}
					onChange={onNameInputChange}
				/>
			</List.Item>
		</List.Item>
	);
};

export default FieldOption;
