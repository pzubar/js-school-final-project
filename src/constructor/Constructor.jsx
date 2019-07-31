import React from 'react'
import {Container, Card} from 'semantic-ui-react'
import {connect} from "react-redux";
import {getFields, getName} from "./form/selectors";
import Field from "./field/Field.jsx";

const Constructor = ({name, fields}) => <Container><Card fluid>
    <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Content>{fields.map(props => <Field {...props}/>)}</Card.Content>
    </Card.Content>
</Card></Container>;

export default connect(
    state => ({
        name: getName(state),
        fields: getFields(state)
    }),
)
(Constructor);
