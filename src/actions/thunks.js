import { deleteForm } from '.';
import { removeFormById, fetchCreateFill } from '../models';
import { showInfoMessage, showErrorMessage } from '../helpers/messages';

export const requestDeleteForm = id => {
	return dispatch => {
		removeFormById(id)
			.then(() => {
				dispatch(deleteForm(id));
				showInfoMessage('Form deleted');
			})
			.catch(showErrorMessage);
	};
};

export const createFill = ({ id, name, fields }) => {
	const fieldsList = Object.values(fields);

	return dispatch => {
		debugger;
		fetchCreateFill({ id, name, fieldsList })
			.then(success => {
				debugger;
			})
			.catch(error => {
				debugger;
			});
	};
};

export default requestDeleteForm;
