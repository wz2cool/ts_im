import * as lodash from 'lodash';

import { Action, AnyAction } from 'redux';
import actionTypes from '../actionTypes';
import { assign } from 'lodash';
import { UserFriendCategoryDto, UserBaseInfoDto } from '../models/dto';

export interface UserCategoryState {
  loading: boolean;
  userId: number;
  items: UserFriendCategoryDto[];
  error: Error;
}

const initialState: UserCategoryState = {
  loading: false,
  userId: 16,
  items: [],
  error: null
};

export default (state = initialState, action: AnyAction) => {
  let result: UserCategoryState;
  switch (action.type) {
    case actionTypes.FETCH_USER_CATEGORY_BEGIN:
      result = {
        ...state,
        loading: true,
        error: null,
      };
      return result;
    case actionTypes.FETCH_USER_CATEGORY_SUCCESS:
      result = {
        ...state,
        loading: false,
        items: action.payload.userFriendCategories,
        error: null,
      };
      return result;
    case actionTypes.FETCH_USER_CATEGORY_FAILURE:
      result = {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
      return result;
    case actionTypes.FETCH_USERS_BY_FRIEND_CATEGORY_ID_BEGIN:
      result = {
        ...state,
        loading: true,
        error: null
      };
      return result;
    case actionTypes.FETCH_USERS_BY_FRIEND_CATEGORY_ID_SUCCESS:
      const userInfos: UserBaseInfoDto[] = action.payload.userInfos;
      if (userInfos.length === 0) {
        return state;
      }

      const userCategoryId = userInfos[0].userFriendCategoryId;
      const userCategoryDto = lodash.find(state.items, x => x.id === userCategoryId);
      if (userCategoryDto) {
        userCategoryDto.userBaseInfos = userInfos;
      }
      result = {
        ...state,
        loading: false,
        items: state.items,
        error: null
      };
      return result;
    case actionTypes.FETCH_USERS_BY_FRIEND_CATEGORY_ID_FAILURE:
      result = {
        ...state,
        loading: false,
        error: action.payload.error
      };
      return result;
    default:
      return state;
  }
};
