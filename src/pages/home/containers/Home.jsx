import React, {useEffect, useState} from "react";
import {Button, Grid, Header, Icon, Segment, Feed, Dimmer, Loader} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {API_PATH} from "../../../constants";

const HomePage = () => {
    const [formsList, setFormsList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`${API_PATH}/forms/list`)
            .then(response => response.json())
            .then(setFormsList)
            .catch(alert)
            .finally(() => setIsLoaded(true))
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
                        <Dimmer active={!isLoaded}>
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
                                    <Link to={`/edit/${id}`}> <Icon name={"edit"}/> Edit</Link>
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
                    <Button primary disabled>Create</Button>
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
};

export default HomePage
