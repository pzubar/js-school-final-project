import { getFormById, editFormById } from '../../../models';
import { showErrorMessage } from '../../../helpers/messages';

export const getForm = id => dispatch => {
	getFormById(id)
		.then(form => {
			const { fields = [], name = '' } = form;

			debugger;
		})
		.catch(showErrorMessage);
};