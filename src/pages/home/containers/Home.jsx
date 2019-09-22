import React, { useEffect, memo } from 'react';
import {
	Button,
	Grid,
	Header,
	Icon,
	Segment,
	Feed,
	Dimmer,
	Loader,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addForm, setLoadedData, setRedirectUrl } from '../../../actions';
import { FORMS, REVIEWER } from '../../../constants';
import {
	getAreFormsLoaded,
	getAreFillsIdsLoaded,
	getFormsList,
} from '../../../selectors';
import { getFillsIds, loadData } from '../../../actions/thunks';
import FormPreview from './FormPreview';

const HomePage = memo(props => {
	const {
		areFormsLoaded,
		areFillsIdsLoaded,
		formsList,
		getFillsIdsConnect,
		loadDataConnect,
		redirectUrl,
		setRedirectConnect,
	} = props;

	useEffect(() => {
		if (redirectUrl) setRedirectConnect('');
	}, [redirectUrl, setRedirectConnect]);
	useEffect(() => {
		if (!areFormsLoaded) loadDataConnect(FORMS);
	}, [areFormsLoaded, loadDataConnect]);
	useEffect(() => {
		if (!areFillsIdsLoaded) getFillsIdsConnect();
	}, [areFillsIdsLoaded, getFillsIdsConnect]);
	useEffect(() => {
		window.document.title = 'Home';
	}, []);

	return (
		<Segment placeholder style={{ height: '100vh' }}>
			<Grid columns={2} divided relaxed stackable textAlign="center">
				<Grid.Row columns={2} verticalAlign="middle">
					<Grid.Column>
						<Header icon>
							<Icon name="edit" />
							My Forms
						</Header>
						<Segment style={{ minHeight: 100 }}>
							<Dimmer active={!areFormsLoaded}>
								<Loader />
							</Dimmer>
							<Feed>
								{!formsList.length && 'You have no forms yet'}
								{formsList.map(data => (
									<FormPreview key={data.id} data={data} />
								))}
								<Link to="/form/new">
									<Button fluid primary>
										Create new form
									</Button>
								</Link>
							</Feed>
						</Segment>
					</Grid.Column>
					<Grid.Column>
						<Header icon>
							<Icon name="eye" />
							See filled forms
						</Header>
						<Link to={REVIEWER}>
							<Button primary>Filled forms</Button>
						</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	);
});

export default connect(
	state => ({
		formsList: getFormsList(state),
		areFormsLoaded: getAreFormsLoaded(state),
		areFillsIdsLoaded: getAreFillsIdsLoaded(state),
		redirectUrl: state.global.redirectUrl,
	}),
	{
		setLoadedDataConnect: setLoadedData,
		addFormConnect: addForm,
		getFillsIdsConnect: getFillsIds,
		loadDataConnect: loadData,
		setRedirectConnect: setRedirectUrl,
	},
)(HomePage);
