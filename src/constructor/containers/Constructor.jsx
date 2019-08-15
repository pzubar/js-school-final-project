import React, {useEffect} from 'react'
import {Container, Card, Grid, Input, Dropdown, Header, Form, Segment} from 'semantic-ui-react'
import {connect} from "react-redux";
import {getFields, getName} from "../selectors";
import FieldCard from "./FieldCard";
import {addField, setName} from "../actions";

const Constructor = ({name, fields, addField, setName}) => {
    useEffect(() => {
        fetch('http://forms-app.brutgroot.com/pzubar/forms/27')
            .then(response => response.json())
            .then(form => {
                // debugger;
                const {fields = [], name = ""} = form;
                fields.forEach(addField);
                setName(name)
            })
            .catch((e) => {
                const form = {
                    "id": 1,
                    "name": "JS School Form",
                    "fields": [
                        {
                            "type": "text",
                            "name": "Name",
                            "label": "Name",
                            "placeholder": ""
                        },
                        {
                            "type": "dropdown",
                            "name": "Gender",
                            "label": "Gender",
                            "placeholder": ""
                        },
                        {
                            "type": "number",
                            "name": "Homeworks done",
                            "label": "Homeworks done",
                            "placeholder": ""
                        },
                        {
                            "type": "number",
                            "name": "Rating",
                            "label": "Rating",
                            "placeholder": ""
                        }
                    ]
                };
                const {fields = []} = form;
                fields.forEach(addField);
            })
    }, []);

    return (
        <Container>
            <Card fluid>
                <Card.Content>
                    <Segment>
                        <Card.Header><Header as='h1'>{name}</Header></Card.Header>
                    </Segment>
                    <Card.Content>
                        <Form>
                            {Object.keys(fields).map(key =>
                                <FieldCard key={key} id={key} {...fields[key]}/>
                            )}
                        </Form>
                    </Card.Content>
                </Card.Content>
            </Card>
        </Container>
    )
};


export default connect(
    state => ({
        name: getName(state),
        fields: getFields(state)
    }),
    {
        addField,
        setName
    }
)
(Constructor);
