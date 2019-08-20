import React, {useEffect, memo} from "react";
import {Button, Grid, Header, Icon, Segment, Feed, Dimmer, Loader} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addForm, setLoadedData} from "../../../actions";
import {FORMS, FILLS} from "../../../constants";
import {getAreFormsLoaded, getAreFillsLoaded, getFormsList, getFillsList} from "../../../selectors";
import {loadFormsList} from "../../../models"
import {requestDeleteForm} from "../../../actions/thunks";

const HomePage = memo((props) => {
    const {setLoadedData, addForm, areFormsLoaded, formsList, deleteForm} = props;

    useEffect(() => {
        if (!areFormsLoaded)
            loadFormsList().then(forms => forms.forEach(addForm)).finally(() => setLoadedData(FORMS))
        window.document.title = "Home";
    }, []);

    return (<Segment placeholder style={{height: "100vh"}}>
        <Grid columns={3} stackable textAlign='center'>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                    <Header icon>
                        <Icon name='edit'/>
                        Edit Forms
                    </Header>
                    <Segment style={{minHeight: 100}}>
                        <Dimmer active={!areFormsLoaded}>
                            <Loader/>
                        </Dimmer>
                        <Feed>
                            {!formsList.length && "You have no forms yet"}
                            {formsList.map(({id, name, fields}) => (
                                <Feed.Event style={{paddingBottom: 10}} key={id}>
                                    <Feed.Content
                                        date={`Fields: ${fields}`}
                                        summary={name}
                                    />
                                    <Button.Group size={'tiny'}>
                                        <Link to={`/form/e/${id}`}>
                                            <Button animated='vertical'>
                                                <Button.Content hidden>Edit</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name='edit'/>
                                                </Button.Content>
                                            </Button>
                                        </Link>
                                        <Button.Or/>
                                        <Button negative animated='vertical' onClick={() => deleteForm(id)}>
                                            <Button.Content hidden>Delete</Button.Content>
                                            <Button.Content visible>
                                                <Icon name='trash'/>
                                            </Button.Content>
                                        </Button>
                                        {/*<Button negative >X</Button>*/}
                                    </Button.Group>
                                </Feed.Event>
                            ))}
                        </Feed>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Header icon>
                        <Icon name='plus circle'/>
                        Create new form
                    </Header>
                    <Link to={`/form/new`}>
                        <Button primary>Create</Button>
                    </Link>
                </Grid.Column>
                <Grid.Column>
                    <Header icon>
                        <Icon name='eye'/>
                        See filled forms
                    </Header>
                    <Button primary disabled>Filled forms</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>)
});

export default connect(
    state => ({
        formsList: getFormsList(state),
        fillsList: getFillsList(state),
        areFormsLoaded: getAreFormsLoaded(state),
        areFillsLoaded: getAreFillsLoaded(state)
    }),
    {
        setLoadedData,
        addForm,
        deleteForm: requestDeleteForm
    }
)(HomePage);
