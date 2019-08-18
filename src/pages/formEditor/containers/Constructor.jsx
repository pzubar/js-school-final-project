import React, {useEffect} from 'react';
import {Card, Input, Button, Form, Segment, Dimmer, Loader, Icon} from 'semantic-ui-react';
import {connect} from "react-redux";
import {getFields, getName, getIsLoaded, getFieldsList} from "../selectors";
import FieldCard from "./FieldCard";
import {addField, setName} from "../actions";
import {getFormById} from "../thunks";
import {MAX_FIELDS} from "../constants";

const Constructor = (props) => {
    const {getFormById, name, fields, addField, setName, isLoaded, id = 27, fieldsList} = props;
    const onFormNameChange = (event, {value}) => setName(value);
    const saveChangesToServer = () => {
        fetch(`http://forms-app.brutgroot.com/pzubar/forms/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({name, fields: Object.values(fields)}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(() => alert("Success!!!"))
            .catch(alert)
    };

    useEffect(() => {
        window.document.title = "Form Editor";
        getFormById(id);
    }, []);

    return (

        <Segment>
            <Dimmer active={!isLoaded} inverted>
                <Loader inverted content='Loading'/>
            </Dimmer>
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
                    <Button
                        attached='bottom' onClick={() => addField()} primary
                        disabled={fieldsList.length === MAX_FIELDS}
                       fluid
                    >
                        Add new field
                    </Button>
                </Card.Content>
            </Card>
            <Button disabled={!isLoaded} onClick={saveChangesToServer} fluid positive>
                Save Changes
            </Button>
        </Segment>
    )
};

export default connect(
    state => ({
        name: getName(state),
        fields: getFields(state),
        isLoaded: getIsLoaded(state),
        fieldsList: getFieldsList(state)
    }),
    {
        addField,
        setName,
        getFormById
    }
)
(Constructor);
