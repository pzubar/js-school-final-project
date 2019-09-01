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
import { setFieldLabel, changeFieldType } from '../actions';

const FieldCard = props => {
	const { dispatch, removeField, id, label, type } = props;
	const onLabelInputChange = useCallback(
		(event, { value }) => dispatch(setFieldLabel({ id, value })),
		[id],
	);
	const onFieldTypeChange = useCallback(
		(event, { value }) => dispatch(changeFieldType({ id, value })),
		[id],
	);

	return (
		<Segment.Group>
			<Segment>
				<Grid columns={2} stackable>
					<Grid.Column>
						<Input
							transparent
							fluid
							placeholder="Question label"
							onChange={onLabelInputChange}
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
									onChange={onFieldTypeChange}
								/>
							</Grid.Column>
							<Grid.Column width={4}>
								<Button
									animated="vertical"
									fluid
									onClick={() => removeField(props.id)}
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
				<FieldContent {...props} />
			</Segment>
		</Segment.Group>
	);
};

export default FieldCard;
