import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Editor from './pages/formEditor';
import HomePage from './pages/home';
import 'semantic-ui-css/semantic.min.css';

const rootElement = document.getElementById('root');

const AppRouter = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/form/new" component={Editor} />
				<Route path="/form/e/:id" component={Editor} />
				<Route render={() => <h1>404 Page will be right here</h1>} />
			</Switch>
		</Router>
	</Provider>
);

ReactDOM.render(<AppRouter />, rootElement);
