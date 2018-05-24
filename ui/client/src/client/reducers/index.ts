import { combineReducers } from 'redux';
import appData from './appData';
import userData from './userData';

export default combineReducers({
  appData,
  userData,
});
