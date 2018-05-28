import { combineReducers } from 'redux';
import appData from './appData';
import userCategoryData from './userCategoryData';

export default combineReducers({
  appData,
  userCategoryData,
});
