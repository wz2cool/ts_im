import { combineReducers } from 'redux';
import appData from './appData';
import userCategoryReducer from './userCategoryReducer';

export default combineReducers({
  appData,
  userCategoryReducer,
});
