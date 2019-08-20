import {deleteForm} from "../actions";
import {removeFormById} from "../models";
import {showInfoMessage} from "../helpers/messages";

export const requestDeleteForm = (id) => {
    return dispatch => {
        removeFormById(id).then(() => {
            dispatch(deleteForm(id));
            showInfoMessage("Form deleted");
        })
    }
};
