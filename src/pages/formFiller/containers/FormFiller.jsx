import React, { useEffect, useReducer, useState, useCallback } from 'react';
import {
	Card,
	Dimmer,
	Form,
	Header,
	Loader,
	Container,
	Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import reducer, { setFieldValue } from '../fillerReducer';
import {
	addField,
	initialState,
	setName,
} from '../../formEditor/editorReducer';
import FillCardContent from '../components/FillCardСontent';
import {
	getFormData,
	getIdFromMatch,
	getIsFormLoaded,
} from '../../../selectors';
import { addForm, setRedirectUrl } from '../../../actions';
import { fetchFormById } from '../../../models';
import { HOME } from '../../../constants';
import { showErrorMessage } from '../../../helpers/messages';

const Filler = props => {
	const {
		id,
		isLoaded,
		formData,
		redirectUrl,
		addFormConnect,
		setRedirectConnect,
	} = props;
	const [state, localDispatch] = useReducer(reducer, initialState);
	const { name, fields } = state;
	const [fieldsList, setFieldsList] = useState([]);

	const onChange = useCallback(({ target }, { value }) => {
		localDispatch(setFieldValue({ id: target.id, value }));
	}, []);
	useEffect(() => setFieldsList(Object.keys(fields)), [fields]);

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
					<Form>
						{fieldsList.map(key => (
							<FillCardContent
								key={key}
								id={key}
								onChange={onChange}
								{...fields[key]}
							/>
						))}
					</Form>
				</Card.Content>
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
	},
)(Filler);
