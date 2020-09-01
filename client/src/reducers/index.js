// main pt of this ROOT reducer is to bring together all our reducers.

import {combineReducers} from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
    item:itemReducer
});
