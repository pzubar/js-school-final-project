import React from "react";
import ReactDOM from "react-dom";
import {store} from "./store";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Editor from "./pages/formEditor";
import HomePage from "./pages/home";
import {Provider} from "react-redux";
import "semantic-ui-css/semantic.min.css";
import {createForm} from "./models";

const rootElement = document.getElementById("root");
const withCreateFormId = Component => props => {
    const id = createForm();

    return <Component {...props} createId={id}/>
};
const AppRouter = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/form/new" component={withCreateFormId(Editor)}/>
                <Route path="/form/e/:id" component={Editor}/>
                <Route render={() => <h1>404 Page will be right here</h1>}/>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<AppRouter/>, rootElement);
