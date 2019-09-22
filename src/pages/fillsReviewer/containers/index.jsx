import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Card,
	Container,
	Dimmer,
	Header,
	Loader,
	Menu,
	Segment,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { loadData } from '../../../actions/thunks';
import { FILLS, FORMS, HOME } from '../../../constants';
import {
	getAreFillsLoaded,
	getAreFormsLoaded,
	getFillsList,
} from '../../../selectors';
import Answer from '../components/Answer';

const FillsReviewer = props => {
	const {
		isLoaded,
		redirectUrl,
		loadDataConnect,
		areFormsLoaded,
		fillsList,
	} = props;

	useEffect(() => {
		if (!areFormsLoaded) loadDataConnect(FORMS);
	}, [areFormsLoaded, loadDataConnect]);

	useEffect(() => {
		if (!isLoaded) loadDataConnect(FILLS);
	}, [isLoaded, loadDataConnect]);

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
			<Dimmer active={!isLoaded || !areFormsLoaded} inverted>
				<Loader inverted content="Loading" />
			</Dimmer>
			<Card fluid>
				<Card.Content>
					<Segment>
						<Card.Header>
							<Header as="h1" label="Form Name" size="large">
								Filled Forms
							</Header>
						</Card.Header>
					</Segment>
					<Card.Content>
						{isLoaded &&
							areFormsLoaded &&
							!fillsList.length &&
							'There are no filled forms yet!'}
						{fillsList.map(fill => (
							<Card key={fill.id} fluid>
								<Segment>
									<Card.Header>
										<Header as="h3">{fill.name}</Header>
									</Card.Header>
								</Segment>
								<Answer fill={fill} />
							</Card>
						))}
					</Card.Content>
				</Card.Content>
			</Card>
		</Container>
	);
};

export default connect(
	state => ({
		isLoaded: getAreFillsLoaded(state),
		areFormsLoaded: getAreFormsLoaded(state),
		fillsList: getFillsList(state),
		redirectUrl: state.global.redirectUrl,
	}),
	{ loadDataConnect: loadData },
)(FillsReviewer);
