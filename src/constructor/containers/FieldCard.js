import React from 'react';
import {Dropdown, Grid, Input, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {addOption, setOptionName, removeOption, removeField, changeFieldType, setFieldLabel} from "../actions";
import FieldContent from "./FieldContent.jsx";
import {FIELD_TYPES} from "../constants/fieldTypes";

const FieldCard = ({changeFieldType, setFieldLabel, ...props}) => (
    <Segment.Group>
        <Segment>
            <Grid columns={2} stackable>
                <Grid.Column>
                    <Input
                        transparent
                        fluid
                        placeholder={'Question label'}
                        onChange={(event, {value}) => setFieldLabel({id: props.id, value})}
                        value={props.label}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Dropdown
                        placeholder='Select type'
                        fluid
                        selection
                        button
                        options={FIELD_TYPES}
                        value={props.type}
                        onChange={(event, {value}) => changeFieldType({id: props.id, value})}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment>
            <FieldContent {...props}/>
        </Segment>
    </Segment.Group>
);

export default connect(
    null,
    {
        setOptionName,
        changeFieldType,
        removeField,
        removeOption,
        addOption,
        setFieldLabel
    }
)(FieldCard);