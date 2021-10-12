import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let reducers = combineReducers({});
const store = () => { return createStore(reducers, applyMiddleware(thunk)) }
export default store();