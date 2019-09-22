import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Editor from './pages/formEditor/containers/FormEditor';
import Filler from './pages/formFiller/containers/FormFiller';
import Filled from './pages/formFiller/components/FilledCardPage';
import Reviewer from './pages/fillsReviewer/containers';
import HomePage from './pages/home/containers/Home';
import 'semantic-ui-css/semantic.min.css';
import {
	EDIT_FORM,
	FILL_FORM,
	HOME,
	NEW_FORM,
	FILLED,
	REVIEWER,
} from './constants';
import './styles.css';

const rootElement = document.getElementById('root');

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path={HOME} component={HomePage} />
				<Route path={NEW_FORM} component={Editor} />
				<Route exact path={`${EDIT_FORM}/:id`} component={Editor} />
				<Route exact path={`${FILL_FORM}/:id`} component={Filler} />
				<Route exact path={`${FILLED}/:id/:name`} component={Filled} />
				<Route exact path={REVIEWER} component={Reviewer} />
				<Route render={() => <h1>404 Page will be right here</h1>} />
			</Switch>
		</Router>
	);
};

ReactDOM.render(
	<Provider store={store}>
		<AppRouter />
	</Provider>,
	rootElement,
);
