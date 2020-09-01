import {createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(rootReducer,initialState, /* preloadedState, */ composeEnhancers(
  applyMiddleware(...middleware)
));
export default store;
