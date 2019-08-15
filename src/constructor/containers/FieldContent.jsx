import React from 'react';
import {Button, Form, Input, Radio, Select, TextArea, Segment, List} from 'semantic-ui-react'

const FieldContent = ({id, type, name, options = [], addOption, label, ...props}) => {
    switch (type) {
        case "input":
        case "number":
            return <Form.Field fluid control={Input} type={type} disabled {...props} />;
        case "text":
            return <Form.TextArea disabled {...props}/>;
        case "dropdown":
        case "radio":
        case "check":
            return <List>
                {options.map(({name, value}) =>
                    <List.Item key={value}>
                        {options.length !== 1 &&
                        <List.Content floated='right'>
                            <Button
                                onClick={() => {
                                }}>
                                X
                            </Button>
                        </List.Content>}
                        <List.Item>
                            <Input fluid
                                   value={name}
                                   onChange={() => {
                                   }}
                            />
                        </List.Item>
                    </List.Item>
                )}
                <Button secondary
                        onClick={() => addOption(id)}>
                    Add Option
                </Button>
            </List>;
        default:
            return console.error("Unexpected field type: " + type) || (<div/>)
    }
};

export default FieldContent;