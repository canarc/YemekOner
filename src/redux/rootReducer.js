import {combineReducers} from 'redux';
import {authReducer} from './reducers/AuthReducer';

const allReducers = {
  authReducer,
};

export const rootReducer = combineReducers(allReducers);
