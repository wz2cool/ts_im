import { Action, AnyAction } from 'redux';
import actionTypes from '../actionTypes';
import { assign } from 'lodash';
import { UserFriendCategoryDto } from '../models/dto';

export interface UserCategoryState {
  loading: boolean;
  userId: number;
  items: UserFriendCategoryDto[];
  error: Error;
}

const initialState: UserCategoryState = {
  loading: false,
  userId: 1,
  items: [],
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
        error: action.payload.error
      };
    default:
      return state;
  }
};
