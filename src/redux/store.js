import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { projectReducer } from './projects/reducer';
import { adminsReducer } from './admins/reducer';
import { employeesReducer } from './employees/reducer';

const rootReducer = combineReducers({
  projects: projectReducer,
  admins: adminsReducer,
  employees: employeesReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
