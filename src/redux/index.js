// import { combineReducers, createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import prescriptionReducer from './prescriptionReducer';

// const rootReducer = combineReducers({
//   prescriptions: prescriptionReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import prescriptionReducer from './prescriptionReducer';

const rootReducer = combineReducers({
  prescriptions: prescriptionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
