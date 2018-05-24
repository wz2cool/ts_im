import { Action, AnyAction } from 'redux';
import actionTypes from '../actionTypes';
import { assign } from 'lodash';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_USER_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.userFriendCategories
      };
    case actionTypes.FETCH_USER_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    default:
      return state;
  }
};
