import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { projectReducer } from './projects/reducer';
import { timeSheetReducer } from './timeSheets/reducer';
import { adminsReducer } from './admins/reducer';

const rootReducer = combineReducers({
  timeSheet: timeSheetReducer,
  projects: projectReducer,
  admins: adminsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
