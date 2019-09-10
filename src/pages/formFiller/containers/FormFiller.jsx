import React, { useEffect, useReducer, useCallback } from 'react';
import {
	Card,
	Dimmer,
	Form,
	Header,
	Loader,
	Container,
	Button,
	Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import reducer, { setFieldValue, addField } from '../fillerReducer';
import { initialState, setName } from '../../formEditor/editorReducer';
import FillCardContent from '../components/FillCardСontent';
import {
	getFormData,
	getIdFromMatch,
	getIsFormLoaded,
} from '../../../selectors';
import { addForm, setRedirectUrl } from '../../../actions';
import { fetchFormById } from '../../../models';
import { FILL_ALL_FIELDS, HOME } from '../../../constants';
import { showErrorMessage } from '../../../helpers/messages';
import { createFill } from '../../../actions/thunks';

const Filler = props => {
	const {
		id,
		isLoaded,
		formData,
		redirectUrl,
		addFormConnect,
		setRedirectConnect,
		createFillConnect,
	} = props;
	const [state, localDispatch] = useReducer(reducer, initialState);
	const { name, fields, fieldsIdsList, isSubmitDisabled } = state;

	const onFieldValueChange = useCallback((fieldId, value) => {
		localDispatch(setFieldValue({ id: fieldId, value }));
	}, []);
	const onSaveChanges = useCallback(() => {
		if (!isSubmitDisabled) createFillConnect({ id, name, fields });
		else (showErrorMessage(FILL_ALL_FIELDS))
	}, [createFillConnect, fields, id, isSubmitDisabled, name]);

	useEffect(() => {
		if (formData) {
			localDispatch(setName(formData.name));
			formData.fields.forEach(field => localDispatch(addField(field)));
		}
	}, [formData]);

	useEffect(() => {
		if (id && isLoaded === false) {
			fetchFormById(id)
				.then(newFormData => {
					addFormConnect({ ...newFormData, id });
				})
				.catch(error => {
					setRedirectConnect(HOME);
					showErrorMessage(error);
				});
		}
	}, [isLoaded, id, setRedirectConnect, addFormConnect]);

	useEffect(() => {
		window.document.title = 'Form Filler';
	}, []);

	return redirectUrl ? (
		<Redirect to={redirectUrl} />
	) : (
		<Container>
			<Dimmer active={!isLoaded} inverted>
				<Loader inverted content="Loading" />
			</Dimmer>
			<Card fluid>
				<Card.Content>
					<Segment>
						<Card.Header>
							<Header as="h1" label="Form Name" size="large">
								{name}
							</Header>
						</Card.Header>
					</Segment>
				</Card.Content>
				<Card.Content>
					<Form onSubmit={onSaveChanges}>
						{fieldsIdsList.map(key => (
							<FillCardContent
								key={key}
								id={key}
								onChange={onFieldValueChange}
								fieldData={fields[key]}
							/>
						))}
					</Form>
				</Card.Content>
				<Button
					positive
					onClick={onSaveChanges}
					disabled={isSubmitDisabled}
				>
					Save changes
				</Button>
			</Card>
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
		createFillConnect: createFill,
	},
)(Filler);
