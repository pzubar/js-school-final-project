import React from 'react';
import { Card, Header, Segment } from 'semantic-ui-react';

const Answer = ({ fill }) => {
	return (
		<Card.Content>
			{fill.fields.map((field, index) => (
				<Card key={field.id} fluid>
					<Segment>
						<Card.Header>
							<Header as="h4">{field.label}</Header>
						</Card.Header>
					</Segment>
					<Card.Content>
						{Object.entries(fill.answers[index]).map(
							([key, value], i) => (
								<ul key={key}>
									{field.type !== 'check' ? (
										<li>{value}</li>
									) : (
										<li>
											{i + 1}:
											<ul>
												{value.map(answer => (
													<li key={answer}>
														{answer}
													</li>
												))}
											</ul>
										</li>
									)}
								</ul>
							),
						)}
					</Card.Content>
				</Card>
			))}
		</Card.Content>
	);
};

export default Answer;
