import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Editor from './pages/formEditor/containers/FormEditor';
import Filler from './pages/formFiller/containers/FormFiller';
import HomePage from './pages/home/containers/Home';
import 'semantic-ui-css/semantic.min.css';
import { EDIT_FORM, FILL_FORM, HOME, NEW_FORM } from './constants';

const rootElement = document.getElementById('root');

const AppRouter = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path={HOME} component={HomePage} />
					<Route path={NEW_FORM} component={Editor} />
					<Route path={`${EDIT_FORM}/:id`} component={Editor} />
					<Route path={`${FILL_FORM}/:id`} component={Filler} />
					<Route
						render={() => <h1>404 Page will be right here</h1>}
					/>
				</Switch>
			</Router>
		</Provider>
	);
};

ReactDOM.render(<AppRouter />, rootElement);
