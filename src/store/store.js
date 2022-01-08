import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import songReducer from '../reducers/song';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    song: songReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;