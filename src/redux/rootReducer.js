import {combineReducers} from 'redux';
import {authReducer} from './reducers/AuthReducer';

const allReducers = {
  auth: authReducer,
};

export const rootReducer = combineReducers(allReducers);
