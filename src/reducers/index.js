import formEditor from "../pages/formEditor/reducer";
import global from "../reducers/global";
import {combineReducers} from "redux";

const reducers = combineReducers({
    formEditor,
    global
});

export default reducers;
