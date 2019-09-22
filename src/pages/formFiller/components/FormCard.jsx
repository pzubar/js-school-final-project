import React from 'react';
import {
	Card,
	Container,
	Dimmer,
	Header,
	Loader,
	Segment,
} from 'semantic-ui-react';

const FormCard = ({ name, isLoaded = true, children }) => {
	return (
		<section className="main-container">
			<Container style={{ maxHeight: '100%' }}>
				<Dimmer active={!isLoaded} inverted>
					<Loader inverted content="Loading" />
				</Dimmer>
				<Card fluid>
					<Card.Content>
						<Segment>
							<Card.Header>
								<Header as="h1" label="Form Name" size="large">
									{name}
								</Header>
							</Card.Header>
						</Segment>
					</Card.Content>
					{children}
				</Card>
			</Container>
		</section>
	);
};

export default FormCard;
