// main pt of this ROOT reducer is to bring together all our reducers.

import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


export default combineReducers({
    item:itemReducer,
    error :errorReducer,
    auth:authReducer
});
