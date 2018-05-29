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
      const userInfos: UserBaseInfoDto[] = action.payload.userBaseInfos;
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
        items: lodash.assign([], state.items),
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
    case actionTypes.EXPAND_USER_CATEGORY:
      return handle_EXPAND_USER_CATEGORY(state, action.payload.categoryId);
    case actionTypes.COLLASPE_USER_CATEGORY:
      return handle_COLLASPE_USER_CATEGORY(state, action.payload.categoryId);
    default:
      return state;
  }
};

function handle_EXPAND_USER_CATEGORY(oldState: UserCategoryState, userCateogoryId: number): UserCategoryState {
  let result: UserCategoryState;
  const userCategoryDto = lodash.find(oldState.items, x => x.id === userCateogoryId);
  if (!userCategoryDto) {
    return oldState;
  }
  userCategoryDto.isOpen = true;
  result = {
    ...oldState,
    items: lodash.assign([], oldState.items),
  };
  return result;
}

function handle_COLLASPE_USER_CATEGORY(oldState: UserCategoryState, userCateogoryId: number): UserCategoryState {
  let result: UserCategoryState;
  const userCategoryDto = lodash.find(oldState.items, x => x.id === userCateogoryId);
  if (!userCategoryDto) {
    return oldState;
  }
  userCategoryDto.isOpen = false;
  result = {
    ...oldState,
    items: lodash.assign([], oldState.items),
  };
  return result;
}
