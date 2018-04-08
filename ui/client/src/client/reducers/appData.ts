import { Action, AnyAction } from 'redux';
import actionTypes from '../actionTypes';
import { assign } from 'lodash';

const initialState = {
  locale: 'zh-cn',
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.UPDATE_APPDATA:
      return assign({}, state, action.data);
    default:
      return state;
  }
};
