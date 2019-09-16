import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import FormCard from './FormCard';
import { FILL_FORM } from '../../../constants';

const FilledCardPage = ({ match }) => {
	const { params } = match;
	const { id, name } = params;

	useEffect
	return (
		<FormCard name={name}>
			<Card.Content>
				<h3>Thank you for your response</h3>
				<Link to={`${FILL_FORM}/${id}`}>Send another response</Link>
			</Card.Content>
		</FormCard>
	);
};

export default FilledCardPage;
