import { deleteForm } from '.';
import { removeFormById } from '../models';
import { showInfoMessage, showErrorMessage } from '../helpers/messages';

const requestDeleteForm = id => {
	return dispatch => {
		removeFormById(id)
			.then(() => {
				dispatch(deleteForm(id));
				showInfoMessage('Form deleted');
			})
			.catch(showErrorMessage);
	};
};

export default requestDeleteForm;
