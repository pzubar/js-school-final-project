import React, {useEffect} from 'react';
import {Container, Card, Input, Button, Form, Segment} from 'semantic-ui-react';
import {connect} from "react-redux";
import {getFields, getName} from "../selectors";
import FieldCard from "./FieldCard";
import {addField, setName} from "../actions";

const Constructor = ({name, fields, addField, setName, id = 27}) => {
    const onFormNameChange = (event, {value}) => setName(value);

    useEffect(() => {
        fetch(`http://forms-app.brutgroot.com/pzubar/forms/${id}`)
            .then(response => response.json())
            .then(form => {
                const {fields = [], name = ""} = form;
                fields.forEach(addField);
                setName(name)
            })
            .catch(alert)
    }, []);

    return (
        <Container>
            <Card fluid>
                <Card.Content>
                    <Segment>
                        <Card.Header>
                            <Input
                                error={!name} label='Form Name' size='large' value={name}
                                onChange={onFormNameChange}/>
                        </Card.Header>
                    </Segment>
                    <Card.Content>
                        <Form>
                            {Object.keys(fields).map(key =>
                                <FieldCard key={key} id={key} {...fields[key]}/>
                            )}
                        </Form>
                    </Card.Content>
                    <Button onClick={() => addField()}>
                        Add new field
                    </Button>
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
