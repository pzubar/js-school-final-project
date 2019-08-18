import React from "react";
import ReactDOM from "react-dom";
import {store} from "./store";
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom"
import Editor from "./pages/formEditor";
import HomePage from "./pages/home";
import {Provider} from "react-redux";
import "semantic-ui-css/semantic.min.css";

const rootElement = document.getElementById("root");
const AppRouter = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/edit/:id" component={Editor}/>
                <Route render={() => <h1>404 Page will be right here</h1>}/>
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<AppRouter/>, rootElement);
