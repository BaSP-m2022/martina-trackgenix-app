import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { timeSheetReducer } from './timeSheets/reducer';
import thunk from 'redux-thunk';
import { tasksReducer } from './tasks/reducer';
import { projectReducer } from './projects/reducer';
import { adminsReducer } from './admins/reducer';
import { employeesReducer } from './employees/reducer';
import { superAdminsReducer } from './superAdmins/reducer';
import { authReducer } from './auth/reducer';

const rootReducer = combineReducers({
  timeSheet: timeSheetReducer,
  projects: projectReducer,
  admins: adminsReducer,
  employees: employeesReducer,
  tasks: tasksReducer,
  superAdmins: superAdminsReducer,
  auth: authReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

export const store = configureStore();

// export default { store };
