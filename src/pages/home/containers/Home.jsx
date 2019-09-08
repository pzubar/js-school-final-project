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
import { addForm, setLoadedData } from '../../../actions';
import { FORMS } from '../../../constants';
import {
	getAreFormsLoaded,
	getAreFillsLoaded,
	getFormsList,
	getFillsList,
} from '../../../selectors';
import { loadFormsList } from '../../../models';
import requestDeleteForm from '../../../actions/thunks';
import { showErrorMessage } from '../../../helpers/messages';

const HomePage = memo(props => {
	const {
		setLoadedDataConnect,
		addFormConnect,
		areFormsLoaded,
		formsList,
		deleteForm,
	} = props;

	useEffect(() => {
		if (!areFormsLoaded)
			loadFormsList()
				.then(forms => forms.forEach(addFormConnect))
				.catch(showErrorMessage)
				.finally(() => setLoadedDataConnect(FORMS));
		window.document.title = 'Home';
	}, [addFormConnect, areFormsLoaded, setLoadedDataConnect]);

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
								{formsList.map(({ id, name, fields }) => (
									<Feed.Event
										style={{ paddingBottom: 10 }}
										key={id}
									>
										<Feed.Content
											date={`Fields: ${fields.length}`}
											summary={name}
										/>
										<Button.Group size="tiny">
											<Link to={`/form/e/${id}`}>
												<Button animated="vertical">
													<Button.Content hidden>
														Edit
													</Button.Content>
													<Button.Content visible>
														<Icon name="edit" />
													</Button.Content>
												</Button>
											</Link>
											<Button.Or />
											<Link to={`/form/f/${id}`}>
												<Button animated="vertical">
													<Button.Content hidden>
														Share
													</Button.Content>
													<Button.Content visible>
														<Icon name="share" />
													</Button.Content>
												</Button>
											</Link>
											<Button.Or />
											<Button
												negative
												animated="vertical"
												onClick={() => deleteForm(id)}
											>
												<Button.Content hidden>
													Delete
												</Button.Content>
												<Button.Content visible>
													<Icon name="trash" />
												</Button.Content>
											</Button>
										</Button.Group>
									</Feed.Event>
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
						<Button primary disabled>
							Filled forms
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	);
});

export default connect(
	state => ({
		formsList: getFormsList(state),
		fillsList: getFillsList(state),
		areFormsLoaded: getAreFormsLoaded(state),
		areFillsLoaded: getAreFillsLoaded(state),
	}),
	{
		setLoadedDataConnect: setLoadedData,
		addFormConnect: addForm,
		deleteForm: requestDeleteForm,
	},
)(HomePage);
