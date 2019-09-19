import {
	addFillId,
	deleteForm,
	setLoadedData,
	addForm,
	addFills,
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

		fetchCreateFill({ id, fieldsList })
			.then(() => {
				if (!state.global.fills[id]) dispatch(addFillId(id));

				showInfoMessage('Thank you for filling the form!');
				dispatch(setRedirectUrl(`${FILLED}/${id}/${name}`));
			})
			.catch(showErrorMessage);
	};
};

export const loadData = type => dispatch => {
	fetchLoadData(type)
		.then(data => {
			if (type === FORMS) data.forEach(item => dispatch(addForm(item)));
			else dispatch(addFills(data));
		})
		.catch(showErrorMessage)
		.finally(() => dispatch(setLoadedData(type)));
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
