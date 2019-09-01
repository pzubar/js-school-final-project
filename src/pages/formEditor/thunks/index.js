import { addField, setName, setIsLoaded } from '../actions';
import { addForm } from '../../../actions';
import { showErrorMessage, showInfoMessage } from '../../../helpers/messages';
import { getFormById, editFormById } from '../../../models';
import { initialState } from '../reducer';
import { INITIAL_FIELD_DATA } from '../constants';
import { getAreFormsLoaded } from '../../../selectors';

export const getForm = id => dispatch => {
	getFormById(id)
		.then(form => {
			const { fields = [], name = '' } = form;
			console.log(fields, name);
			debugger;
			fields.forEach(field => dispatch(addField(field)));
			dispatch(setName(name));
			dispatch(setIsLoaded(true));
		})
		.catch(showErrorMessage);
};

export const createForm = createId => {
	return (dispatch, getState) => {
		const { name } = initialState;
		const fields = [INITIAL_FIELD_DATA];

		editFormById(createId, name, fields)
			.then(() => {
				const areFormsLoaded = getAreFormsLoaded(getState());

				dispatch(addField(INITIAL_FIELD_DATA));
				dispatch(setIsLoaded(true));
				if (areFormsLoaded) addForm({ id: createId, name, fields: 1 });
				history.pushState(
					null,
					null,
					window.location.href.replace('new', `e/${createId}`),
				);
			})
			.then(() => showInfoMessage('Form Created'))
			.catch(showErrorMessage);
	};
};
