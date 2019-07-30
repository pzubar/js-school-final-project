import React from 'react'
import ReactDOM from 'react-dom'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Image,
    Item,
    Label,
    Menu,
    Segment,
    Step,
    Table,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const ResponsiveLayout = () => (
    <div>
        <Header as='h1' content='Hello, world!' textAlign='center'/>
    </div>
);

ReactDOM.render(<ResponsiveLayout/>, document.querySelector("#root"));