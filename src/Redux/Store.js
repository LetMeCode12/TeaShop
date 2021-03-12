import rootReducer from "./rootReducer";
import {createStore, compose} from "redux";
import { applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk,logger)
);