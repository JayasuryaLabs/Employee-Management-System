import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk as a named import
import rootReducer from "./reducers";

// create new store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
