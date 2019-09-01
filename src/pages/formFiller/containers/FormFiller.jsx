import React, { useEffect, useReducer, useState } from 'react';
import {
	Card,
	Dimmer,
	Form,
	Header,
	Loader,
	Responsive,
	Segment,
} from 'semantic-ui-react';
import reducer from '../reducer';
import { initialState } from '../../formEditor/reducer';
import { getForm } from '../../formEditor/thunks';
import FillCard from '../components/FillCard';

const Filler = ({ match }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { name, isLoaded, fields } = state;
	const [fieldsList, setFieldsList] = useState([]);
	const { params } = match;
	const { id } = params;

	useEffect(() => {
		setFieldsList(Object.keys(fields));
	}, [fields]);

	useEffect(() => {
		getForm(id)(dispatch);
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
							<Header as="h1" label="Form Name" size="large">
								{name}
							</Header>
						</Card.Header>
					</Segment>
				</Card.Content>
				<Card.Content>
					<Form>
						{fieldsList.map(key => (
							<FillCard
								key={key}
								id={key}
								{...fields[key]}
							/>
						))}
					</Form>
				</Card.Content>
			</Card>
		</Responsive>
	);
};

export default Filler;
