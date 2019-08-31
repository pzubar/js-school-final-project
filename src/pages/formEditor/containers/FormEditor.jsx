import React, { useEffect } from 'react';
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
import { getFields, getName, getIsLoaded, getFieldsList } from '../selectors';
import FieldCard from './FieldCard';
import { addField, setName } from '../actions';
import { getForm, createForm } from '../thunks';
import { MAX_FIELDS } from '../constants';
import { editFormById } from '../../../models';
import { requestDeleteForm } from '../../../actions/thunks';
import { showErrorMessage, showInfoMessage } from '../../../helpers/messages';

const FormEditor = props => {
	const {
		getForm,
		name,
		fields,
		addField,
		setName,
		isLoaded,
		fieldsList,
		match,
		createId,
		createForm,
	} = props;
	const { params } = match;
	const { id } = params;
	const onFormNameChange = (event, { value }) => setName(value);
	const saveChangesToServer = () => {
		editFormById(id || createId, name, Object.values(fields))
			.then(showInfoMessage)
			.catch(showErrorMessage);
	};

	useEffect(() => {
		if (id) getForm(id);
		else createForm(createId);
	}, []);

	return (
		<Responsive as={Segment}>
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
							{Object.keys(fields).map(key => (
								<FieldCard
									key={key}
									id={key}
									{...fields[key]}
								/>
							))}
						</Form>
					</Card.Content>
					<Button
						attached="bottom"
						onClick={() => addField()}
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
	state => ({
		name: getName(state),
		fields: getFields(state),
		isLoaded: getIsLoaded(state),
		fieldsList: getFieldsList(state),
	}),
	{
		addField,
		setName,
		getForm,
		createForm,
		deleteForm: requestDeleteForm,
	},
)(FormEditor);
