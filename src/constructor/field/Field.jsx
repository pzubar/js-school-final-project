import React from 'react'
import {Button, Checkbox, Form, Input, Radio, Select, TextArea} from 'semantic-ui-react'

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
    {key: 'o', text: 'Other', value: 'other'},
];

const withChangeHandling = FieldComponent => props => {
    const handleChange = (event, {value}) => {
    debugger;
    };

    return <FieldComponent {...props} onChange={handleChange}/>
};

const Field = ({type, name, ...props}) => {

    switch (type) {
        case "input":
            return <Form.Field control={Input} {...props}/>;
        case "select":
            return <Form.Field control={Select} {...props} options={options} placeholder='Gender'/>;
        case "radio":
            return <Form.Group inline>
                <label>Quantity</label>
                <Form.Field
                    control={Radio}
                    label='One'
                    value='1'
                    // checked={value === '1'}
                    onChange={props.onChange}
                />
                <Form.Field
                    control={Radio}
                    label='Two'
                    value='2'
                    // checked={value === '2'}
                    // onChange={handleChange}
                />
                <Form.Field
                    control={Radio}
                    label='Three'
                    value='3'
                    // checked={value === '3'}
                    // onChange={handleChange}
                />
            </Form.Group>;
        default:
            throw new Error("Unexpected field type");
    }
};

//
export default withChangeHandling(Field);