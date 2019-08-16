import React, {useEffect} from 'react';
import {Card, Input, Button, Form, Segment, Dimmer, Loader} from 'semantic-ui-react';
import {connect} from "react-redux";
import {getFields, getName} from "../selectors";
import FieldCard from "./FieldCard";
import {addField, setName, setIsLoaded} from "../actions";

const Constructor = ({name, fields, addField, setName, setIsLoaded, isLoaded, id = 27}) => {
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
        fetch(`http://forms-app.brutgroot.com/pzubar/forms/${id}`)
            .then(response => response.json())
            .then(form => {
                const {fields = [], name = ""} = form;

                fields.forEach(addField);
                setName(name);
                setIsLoaded(true);
            })
            .catch(alert)
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
                    <Button onClick={() => addField()} fluid primary>
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
        isLoaded: state.formConstructor.isLoaded
    }),
    {
        addField,
        setName,
        setIsLoaded
    }
)
(Constructor);
