import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
	Card,
	Input,
	Button,
	Form,
	Segment,
	Dimmer,
	Loader,
	Responsive,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import FieldCard from '../components/FieldCard.jsx';
import {
	addField,
	addOption,
	removeField,
	removeOption,
	setName,
	setOptionName,
} from '../actions';
import { getForm, createForm } from '../thunks';
import { MAX_FIELDS } from '../constants';
import { editFormById, getNewFormId } from '../../../models';
import { showErrorMessage, showInfoMessage } from '../../../helpers/messages';
import reducer, { initialState } from '../reducer';

const FormEditor = ({ match }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [fieldsList, setFieldsList] = useState([]);
	const { params } = match;
	const { id } = params;
	const { isLoaded, name, fields } = state;

	const onFormNameChange = useCallback((event, { value }) => {
		dispatch(setName(value));
	}, []);

	const saveChangesToServer = useCallback(() => {
		editFormById(id, name, Object.values(fields))
			.then(showInfoMessage)
			.catch(showErrorMessage);
	}, [id, name, fields]);

	const onOptionNameChange = useCallback(
		data => dispatch(setOptionName(data)),
		[],
	);
	const onFieldAddClick = useCallback(() => dispatch(addField()), []);
	const onFieldRemoveClick = useCallback(
		data => dispatch(removeField(data)),
		[],
	);
	const onOptionRemove = useCallback(
		data => dispatch(removeOption(data)),
		[],
	);
	const onOptionAdd = useCallback(data => dispatch(addOption(data)), []);
	useEffect(() => {
		setFieldsList(Object.keys(fields));
	}, [fields]);

	useEffect(() => {
		if (id) getForm(id)(dispatch);
		else createForm(getNewFormId())(dispatch);
	}, []);

	return (
		<Responsive as={Segment}>
			<Dimmer active={!isLoaded} inverted>
				<Loader inverted content="Loading"/>
			</Dimmer>
			<Card fluid>
				<Card.Content>
					<Segment>
						<Card.Header>
							<Input
								error={!name}
								label="Form Name"
								size="large"
								value={name}
								onChange={onFormNameChange}
							/>
						</Card.Header>
					</Segment>
					<Card.Content>
						<Form>
							{fieldsList.map(key => (
								<FieldCard
									key={key}
									id={key}
									setOptionName={onOptionNameChange}
									removeField={onFieldRemoveClick}
									removeOption={onOptionRemove}
									addOption={onOptionAdd}
									dispatch={dispatch}
									{...fields[key]}
								/>
							))}
						</Form>
					</Card.Content>
					<Button
						attached="bottom"
						onClick={onFieldAddClick}
						primary
						disabled={fieldsList.length === MAX_FIELDS}
						fluid
					>
						Add new field
					</Button>
				</Card.Content>
			</Card>
			<Button
				disabled={!isLoaded}
				onClick={saveChangesToServer}
				fluid
				positive
			>
				Save Changes
			</Button>
		</Responsive>
	);
};

export default connect(
	state => state,
	{},
)(FormEditor);
