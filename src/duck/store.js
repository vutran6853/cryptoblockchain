import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import cyprtoReducer from './cyprtoReducer';

////  Use for mult reducers
const combinedReducers = combineReducers({
  cyprtoData: cyprtoReducer,
});

////  REDUX Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

//// Store combinreducer and middle into store
const store = createStore(combinedReducers, middlewares)

export default store;