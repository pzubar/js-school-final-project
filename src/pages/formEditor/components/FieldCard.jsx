import React, { useCallback } from 'react';
import {
	Dropdown,
	Grid,
	Input,
	Segment,
	Button,
	Icon,
} from 'semantic-ui-react';
import FieldContent from './FieldContent';
import { FIELD_TYPES } from '../constants/fieldTypes';

const FieldCard = props => {
	const {
		removeField,
		id,
		onLabelChange,
		fieldData,
		onTypeChange,
		onOptionAdd,
		setOptionName,
		onOptionRemove,
	} = props;
	const { label, type, options } = fieldData;
	const onDropdownChange = useCallback(
		(event, { value }) => onTypeChange({ id, value }),
		[id, onTypeChange],
	);
	const onFieldRemoveClick = useCallback(() => removeField(id), [
		id,
		removeField,
	]);
	return (
		<Segment.Group>
			<Segment>
				<Grid columns={2} stackable>
					<Grid.Column>
						<Input
							transparent
							fluid
							placeholder="Question label"
							name={id}
							onChange={onLabelChange}
							value={label}
						/>
					</Grid.Column>
					<Grid.Column>
						<Grid>
							<Grid.Column width={12}>
								<Dropdown
									placeholder="Select type"
									fluid
									selection
									button
									options={FIELD_TYPES}
									value={type}
									onChange={onDropdownChange}
								/>
							</Grid.Column>
							<Grid.Column width={4}>
								<Button
									animated="vertical"
									fluid
									onClick={onFieldRemoveClick}
								>
									<Button.Content hidden>
										Remove
									</Button.Content>
									<Button.Content visible>
										<Icon name="trash alternate" />
									</Button.Content>
								</Button>
							</Grid.Column>
						</Grid>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment>
				<FieldContent
					id={id}
					type={type}
					options={options}
					onOptionAdd={onOptionAdd}
					onOptionRemove={onOptionRemove}
					setOptionName={setOptionName}
					label={label}
				/>
			</Segment>
		</Segment.Group>
	);
};

export default FieldCard;
