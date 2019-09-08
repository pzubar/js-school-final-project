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
import { Link, Redirect } from 'react-router-dom';
import FieldCard from '../components/FieldCard';
import createForm from '../helpers';
import { editFormById, getNewFormId, fetchFormById } from '../../../models';
import { showErrorMessage, showInfoMessage } from '../../../helpers/messages';
import reducer, {
	initialState,
	addField,
	addOption,
	changeFieldType,
	removeField,
	removeOption,
	setFieldLabel,
	setName,
	setOptionName,
} from '../editorReducer';
import { EDIT_FORM, HOME, MAX_FIELDS_IN_FORM } from '../../../constants';
import {
	getFormData,
	getIdFromMatch,
	getIsFormLoaded,
} from '../../../selectors';
import { addForm, setRedirectUrl } from '../../../actions';

const FormEditor = props => {
	const {
		id,
		isLoaded,
		formData,
		redirectUrl,
		addFormConnect,
		setRedirectConnect,
	} = props;
	const [state, localDispatch] = useReducer(reducer, initialState);
	const [fieldsList, setFieldsList] = useState([]);
	const { name, fields } = state;

	const onFormNameChange = useCallback((event, { value }) => {
		localDispatch(setName(value));
	}, []);
	const onOptionNameChange = useCallback(
		data => localDispatch(setOptionName(data)),
		[],
	);
	const onFieldAddClick = useCallback(() => localDispatch(addField()), []);
	const onFieldRemoveClick = useCallback(
		fieldId => localDispatch(removeField(fieldId)),
		[],
	);
	const onOptionRemove = useCallback(
		data => localDispatch(removeOption(data)),
		[],
	);
	const onOptionAdd = useCallback(
		({ target }) => localDispatch(addOption(target.name)),
		[],
	);
	const onFieldLabelChange = useCallback(({ target }, { value }) => {
		const { name: fieldId } = target;

		localDispatch(setFieldLabel({ id: fieldId, value }));
	}, []);
	const onFieldTypeChange = useCallback(({ id: fieldId, value }) => {
		localDispatch(changeFieldType({ id: fieldId, value }));
	}, []);
	const onSaveButtonClick = useCallback(() => {
		editFormById(id, name, Object.values(fields))
			.then(showInfoMessage)
			.catch(showErrorMessage);
	}, [id, name, fields]);

	useEffect(() => setFieldsList(Object.keys(fields)), [fields]);

	useEffect(() => {
		if (formData) {
			localDispatch(setName(formData.name));
			formData.fields.forEach(field => localDispatch(addField(field)));
		}
	}, [formData]);
	useEffect(() => {
		if (!id) {
			createForm(getNewFormId(), newFormData => {
				addFormConnect(newFormData);
				setRedirectConnect(`${EDIT_FORM}/${newFormData.id}`);
			});
		} else if (isLoaded === false) {
			fetchFormById(id)
				.then(newFormData => addFormConnect({ ...newFormData, id }))
				.catch(error => {
					showErrorMessage(error);
					setRedirectConnect(HOME);
				});
		}
	}, [isLoaded, id, setRedirectConnect, addFormConnect]);

	useEffect(() => {
		window.document.title = 'Form Editor';
	}, []);

	useEffect(() => {
		if (redirectUrl) setRedirectConnect('');
	}, [redirectUrl, setRedirectConnect]);

	return redirectUrl ? (
		<Redirect to={redirectUrl} />
	) : (
		<Container>
			<Menu inverted>
				<Container>
					<Menu.Item header>
						<Link to={HOME}>Home</Link>
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
						disabled={fieldsList.length === MAX_FIELDS_IN_FORM}
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
	(state, props) => ({
		id: getIdFromMatch(state, props),
		isLoaded: getIsFormLoaded(state, props),
		redirectUrl: state.global.redirectUrl,
		formData: getFormData(state, props),
	}),
	{
		addFormConnect: addForm,
		setRedirectConnect: setRedirectUrl,
	},
)(FormEditor);
