import React from 'react';
import {Dropdown, Grid, Input, Form, Card, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import {addOption, addField} from "../actions";
import FieldContent from "./FieldContent.jsx";
import {FIELD_TYPES} from "../constants/fieldTypes";

const FieldCard = (props) => (
    <Segment.Group>
        <Segment>
            <Grid columns={2} stackable>
                <Grid.Column>
                    <Input transparent fluid placeholder={'Question label'} value={props.label}/>
                </Grid.Column>
                <Grid.Column>
                    <Dropdown
                        placeholder='Select type'
                        fluid
                        selection
                        button
                        options={FIELD_TYPES}
                        value={props.type}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
        <FieldContent {...props}/>
    </Segment.Group>
);

export default connect(
    // state => ({
    //     title: getTitle(state),
    //     type: getType(state)
    // }),
    null,
    {
        // setTitle: setQuestionTitle,
        // setType: changeType,
        addOption
    }
)(FieldCard);