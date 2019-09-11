import { database } from '../../fbConfig';
import { API_PATH, FILLS } from '../constants';
import { getFillId } from '../helpers';
import { showErrorMessage } from '../helpers/messages';

export const fetchLoadData = type => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/${type}/`)
			.once('value')
			.then(snapshot => {
				try {
					const result = [];

					snapshot.forEach(childSnapshot => {
						const id = childSnapshot.key;
						const { name, fields } = childSnapshot.val();

						result.push({ id, name, fields });
					});
					resolve(result);
				} catch (e) {
					reject(e);
				}
			})
			.then(error => {
				if (error) {
					reject(error);
				}
			});
	});
};

export const getNewFormId = () =>
	database
		.ref()
		.child('forms')
		.push().key;

export const editFormById = (id, name, fields) => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/forms/${id}`)
			.set({ name, fields })
			.then(error => {
				if (error) reject(error);
				else resolve('Success');
			});
	});
};

export const fetchRemoveForm = (id, name) => {
	const fillId = getFillId(id, name);

	return new Promise((resolve, reject) => {
		database
			.ref(`/forms/${id}`)
			.remove()
			.then(error => {
				if (error) reject(error);
				else {
					const fillsRef = database.ref(`/${FILLS}/${fillId}`);

					fillsRef.remove().then(err => {
						if (err) showErrorMessage(err);
					});
					resolve('Success');
				}
			});
	});
};

export const fetchFormById = id => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/forms/${id}`)
			.once('value')
			.then(snapshot => {
				const value = snapshot.val();

				if (!value) throw Error('Form was not found');
				resolve(value);
			})
			.catch(reject);
	});
};

export const fetchCreateFill = ({ fillId, fieldsList }) => {
	return new Promise((resolve, reject) => {
		const newFillRef = database.ref(`/${FILLS}/${fillId}`).push();

		newFillRef.set(fieldsList).then(error => {
			if (error) reject(error);
			else resolve(newFillRef);
		});
	});
};

export const fetchFillsIds = () => {
	return new Promise((resolve, reject) => {
		fetch(`${API_PATH}/fills.json?shallow=true`)
			.then(response => response.json())
			.then(resolve)
			.catch(reject);
	});
};
