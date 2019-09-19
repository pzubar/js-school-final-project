import { database } from '../../fbConfig';
import { API_PATH, FILLS, FORMS } from '../constants';
import { showErrorMessage } from '../helpers/messages';

export const fetchLoadData = type => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/${type}/`)
			.once('value')
			.then(snapshot => {
				try {
					const result = type === FORMS ? [] : {};

					if (type === FORMS) {
						snapshot.forEach(childSnapshot => {
							const id = childSnapshot.key;
							const { name, fields } = childSnapshot.val();

							result.push({ id, name, fields });
						});
					} else {
						snapshot.forEach(childSnapshot => {
							const id = childSnapshot.key;

							result[id] = Object.values(childSnapshot.val());
						});
					}
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

export const fetchRemoveForm = id => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/forms/${id}`)
			.remove()
			.then(error => {
				if (error) reject(error);
				else {
					const fillsRef = database.ref(`/${FILLS}/${id}`);

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

export const fetchCreateFill = ({ id, fieldsList }) => {
	return new Promise((resolve, reject) => {
		fieldsList.forEach(({ value }, index) => {
			database
				.ref(`/${FILLS}/${id}/${index}`)
				.push()
				.set(value)
				.then(error => {
					if (error) reject(error);
					else resolve();
				});
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
