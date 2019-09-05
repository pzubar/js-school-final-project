import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
	Card,
	Input,
	Button,
	Form,
	Segment,
	Dimmer,
	Loader,
	Container,
	Menu,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FieldCard from '../components/FieldCard';
import {
	addField,
	addOption,
	changeFieldType,
	removeField,
	removeOption,
	setFieldLabel,
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
	const onOptionNameChange = useCallback(
		data => dispatch(setOptionName(data)),
		[],
	);
	const onFieldAddClick = useCallback(() => dispatch(addField()), []);
	const onFieldRemoveClick = useCallback(
		fieldId => dispatch(removeField(fieldId)),
		[],
	);
	const onOptionRemove = useCallback(
		data => dispatch(removeOption(data)),
		[],
	);
	const onOptionAdd = useCallback(
		({ target }) => dispatch(addOption(target.name)),
		[],
	);
	const onFieldLabelChange = useCallback(({ target }, { value }) => {
		const { name: fieldId } = target;

		dispatch(setFieldLabel({ id: fieldId, value }));
	}, []);
	const onFieldTypeChange = useCallback(({ id: fieldId, value }) => {
		dispatch(changeFieldType({ id: fieldId, value }));
	}, []);
	const onSaveButtonClick = useCallback(() => {
		editFormById(id, name, Object.values(fields))
			.then(showInfoMessage)
			.catch(showErrorMessage);
	}, [id, name, fields]);

	useEffect(() => setFieldsList(Object.keys(fields)), [fields]);

	useEffect(() => {
		if (id) getForm(id)(dispatch);
		else createForm(getNewFormId())(dispatch);
		window.document.title = 'Form Editor';
	}, [id]);

	return (
		<Container>
			<Menu inverted>
				<Container>
					<Menu.Item as="a" header>
						<Link to="/">Home</Link>
					</Menu.Item>
				</Container>
			</Menu>
			<Dimmer active={!isLoaded} inverted>
				<Loader inverted content="Loading" />
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
									onLabelChange={onFieldLabelChange}
									setOptionName={onOptionNameChange}
									removeField={onFieldRemoveClick}
									onOptionRemove={onOptionRemove}
									onOptionAdd={onOptionAdd}
									onTypeChange={onFieldTypeChange}
									fieldData={fields[key]}
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
				onClick={onSaveButtonClick}
				fluid
				positive
			>
				Save Changes
			</Button>
		</Container>
	);
};

export default connect(
	state => state,
	{},
)(FormEditor);
