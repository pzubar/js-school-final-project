import {
	addFillId,
	deleteForm,
	setLoadedData,
	addForm,
	addFill,
	setRedirectUrl,
} from '.';
import {
	fetchRemoveForm,
	fetchCreateFill,
	fetchFillsIds,
	fetchLoadData,
} from '../models';
import {
	showInfoMessage,
	showErrorMessage,
	showPrompt,
} from '../helpers/messages';
import { FILLED, FILLS_IDS, FORMS } from '../constants';
import { getAreFillsLoaded } from '../selectors';

export const requestDeleteForm = (id, name) => {
	return dispatch => {
		showPrompt('You want to delete form').then(() =>
			fetchRemoveForm(id, name)
				.then(() => {
					dispatch(deleteForm(id));
					showInfoMessage('Form deleted');
				})
				.catch(showErrorMessage),
		);
	};
};

export const createFill = ({ id, name, fields }) => {
	const fieldsList = Object.values(fields);

	return (dispatch, getState) => {
		const state = getState();
		const areFillsLoaded = getAreFillsLoaded(state);

		fetchCreateFill({ id, fieldsList })
			.then(() => {
				if (areFillsLoaded) dispatch(addFill({ id, fieldsList }));
				if (!state.global.fills[id]) dispatch(addFillId(id));

				showInfoMessage('Thank you for filling the form!');
				dispatch(setRedirectUrl(`${FILLED}/${id}/${name}`));
			})
			.catch(showErrorMessage);
	};
};

export const loadData = type => dispatch => {
	fetchLoadData(type)
		.then(data =>
			data.forEach(item => {
				dispatch(type === FORMS ? addForm(item) : addFill(item));
			}),
		)
		.catch(showErrorMessage)
		.finally(() => dispatch(setLoadedData(FORMS)));
};

export const getFillsIds = () => dispatch => {
	fetchFillsIds()
		.then(fills => {
			if (fills && typeof fills === 'object')
				Object.keys(fills).forEach(id => {
					if (id) dispatch(addFillId(id));
				});
		})
		.catch(showErrorMessage)
		.finally(() => dispatch(setLoadedData(FILLS_IDS)));
};
