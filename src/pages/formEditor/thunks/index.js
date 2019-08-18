import {API_PATH} from "../../../constants";
import {addField, setName, setIsLoaded} from "../actions";
import {showErrorMessage} from "../../../helpers/messages";

export const getFormById = (id) => {
    return dispatch => {
        fetch(`${API_PATH}/forms/${id}`)
            .then(response => response.json())
            .then(form => {
                const {fields = [], name = ""} = form;

                fields.forEach(field => dispatch(addField(field)));
                dispatch(setName(name));
                dispatch(setIsLoaded(true));
            })
            .catch(showErrorMessage)
    }
};