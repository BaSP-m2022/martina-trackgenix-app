import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { adminsReducer } from './admins/reducer';
import { superAdminsReducer } from './superAdmins/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  superAdmins: superAdminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
