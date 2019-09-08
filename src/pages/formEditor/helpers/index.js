import { showErrorMessage, showInfoMessage } from '../../../helpers/messages';
import { editFormById } from '../../../models';
import { initialState } from '../editorReducer';
import { INITIAL_FIELD_DATA } from '../../../constants';

const createForm = (createId, callback) => {
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

export default createForm;
