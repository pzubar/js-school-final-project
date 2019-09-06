import { showErrorMessage, showInfoMessage } from '../../../helpers/messages';
import { fetchFormById, editFormById } from '../../../models';
import { initialState } from '../editorReducer';
import { INITIAL_FIELD_DATA } from '../../../constants';

export const getFormById = id =>
	new Promise((resolve, reject) => {
		fetchFormById(id)
			.then(form => {
				resolve({ ...form, id });
			})
			.catch(reject);
	});

export const createForm = (createId, callback) => {
	const { name } = initialState;
	const fields = [INITIAL_FIELD_DATA];

	editFormById(createId, name, fields)
		.then(() => showInfoMessage('Form Created'))
		.then(() => {
			callback({ id: createId, name, fields });
		})
		.catch(error => {
			showErrorMessage(error);
		});
};
