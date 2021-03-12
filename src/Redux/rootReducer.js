import {ErrorsReducer} from "./Reducers/ErrorsReducer";
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';
import {UserReducer} from "./Reducers/UserReducer";
import { ProductReducer } from "./Reducers/ProductReducer";
import { reducer as modal } from 'redux-modal'
import {OrderReducer} from "./Reducers/OrderReducer";


export default combineReducers({
    Errors:ErrorsReducer,
    User:UserReducer,
    Products:ProductReducer,
    Orders:OrderReducer,
    form,
    modal,
});


