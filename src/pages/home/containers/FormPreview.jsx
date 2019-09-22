import React, { useCallback, useState, useEffect } from 'react';
import { Button, Feed, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getAreFillsIdsLoaded,
	getFillsIdsList,
	getLoadedData,
} from '../../../selectors';
import { requestDeleteForm } from '../../../actions/thunks';

const FormPreview = props => {
	const { data, fillsIdsList, areFillsIdsLoaded, deleteFormConnect } = props;
	const { id, name, fields } = data;
	const onDeleteForm = useCallback(() => deleteFormConnect(id), [
		deleteFormConnect,
		id,
	]);
	const [isEditDisabled, setIsEditDisabled] = useState(true);

	useEffect(() => {
		if (areFillsIdsLoaded && !fillsIdsList.includes(id))
			setIsEditDisabled(false);
	}, [areFillsIdsLoaded, fillsIdsList, id]);
	return (
		<Feed.Event style={{ paddingBottom: 10 }} key={id}>
			<Feed.Content date={`Fields: ${fields.length}`} summary={name} />
			<Button.Group size="tiny">
				<Button animated="vertical" disabled={isEditDisabled}>
					<Link to={`/form/e/${id}`}>
						<Button.Content hidden>Edit</Button.Content>
						<Button.Content visible>
							<Icon name="edit" />
						</Button.Content>
					</Link>
				</Button>
				<Button.Or />
				<Link to={`/form/f/${id}`}>
					<Button animated="vertical">
						<Button.Content hidden>Share</Button.Content>
						<Button.Content visible>
							<Icon name="share" />
						</Button.Content>
					</Button>
				</Link>
				<Button.Or />
				<Button negative animated="vertical" onClick={onDeleteForm}>
					<Button.Content hidden>Delete</Button.Content>
					<Button.Content visible>
						<Icon name="trash" />
					</Button.Content>
				</Button>
			</Button.Group>
		</Feed.Event>
	);
};

export default connect(
	state => ({
		loadedData: getLoadedData(state),
		fillsIdsList: getFillsIdsList(state),
		areFillsIdsLoaded: getAreFillsIdsLoaded(state),
	}),
	{
		deleteFormConnect: requestDeleteForm,
	},
)(FormPreview);
