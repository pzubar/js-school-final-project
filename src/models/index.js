import { database } from '../../fbConfig';

export const loadFormsList = () => {
	return new Promise((resolve, reject) => {
		database
			.ref('/forms/')
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

export const removeFormById = id => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/forms/${id}`)
			.remove()
			.then(error => {
				if (error) reject(error);
				else resolve('Success');
			});
	});
};

export const fetchFormById = id => {
	return new Promise((resolve, reject) => {
		database
			.ref(`/forms/${id}`)
			.once('value')
			.then(snapshot => {
				resolve(snapshot.val());
			})
			.catch(reject);
	});
};

export const fetchCreateFill = ({ id, name, fieldsList }) => {
	return new Promise((resolve, reject) => {
		const newFillRef = database.ref(`/fills/${name}::${id}`).push();

		newFillRef.set(fieldsList).then(error => {
			if (error) reject(error);
			else resolve('Success');
		});
	});
};
