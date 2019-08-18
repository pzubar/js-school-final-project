import React from 'react';
import {Button, Form, Input, Radio, Select, TextArea, Segment, List, Icon} from 'semantic-ui-react'

const FieldContent = (props) => {
    const {id, type, name, options = [], addOption, removeOption, setOptionName, label} = props;

    switch (type) {
        case "input":
        case "number":
            return <Form.Field fluid control={Input} type={type} disabled label={label}/>;
        case "text":
            return <Form.TextArea disabled label={label}/>;
        case "dropdown":
        case "radio":
        case "check":
            return <List>
                {options.map(({name, value}, index) =>
                    <List.Item key={value}>
                        {options.length !== 1 &&
                        <List.Content floated='right'>
                            <Button
                                onClick={() => removeOption({id, value})}>
                                X
                            </Button>
                        </List.Content>}
                        <List.Item>
                            <Input
                                error={!name}
                                fluid
                                value={name}
                                onChange={(event, {value: name}) => {
                                    setOptionName({id, value, name})
                                }}
                            />
                        </List.Item>
                    </List.Item>
                )}
                <Button secondary basic color='teal' fluid icon
                        onClick={() => addOption(id)}>
                    <Icon name={"plus square"}/>
                    Add Option
                </Button>
            </List>;
        default:
            return console.error("Unexpected field type: " + type) || (<div/>)
    }
};

export default FieldContent;