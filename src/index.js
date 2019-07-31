import React from "react";
import ReactDOM from "react-dom";
import {store} from "./store";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Constructor from "./constructor/Constructor.jsx"
import {Provider} from "react-redux";
import "semantic-ui-css/semantic.min.css";

const rootElement = document.getElementById("root");
const AppRouter = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" exact component={Constructor}/>
        </Router>
    </Provider>
);

ReactDOM.render(<AppRouter/>, rootElement);
