import { UserInfoPageDto, UserFilterDto } from "../../../models/dto";
import { AnyAction } from "redux";
import * as lodash from "lodash";
import {
  FETCH_USER_INFO_PAGE_BEGIN,
  FETCH_USER_INFO_PAGE_SUCCESS,
  FETCH_USER_INFO_PAGE_FAILED,
  PAGE_NUM_CHANGE,
  PAGE_SIZE_CHANGE,
  SEARCH_FIELD_CHANGE,
} from "../actions/user-list.action";

export interface ReducerState {
  loading: boolean;
  userInfoPage: UserInfoPageDto;
  userFilter: UserFilterDto;
  error?: Error;
  pageNum: number;
  pageSize: number;
}

const initialState: ReducerState = {
  loading: false,
  userInfoPage: new UserInfoPageDto(),
  userFilter: new UserFilterDto(),
  error: undefined,
  pageNum: 1,
  pageSize: 10,
};

const ACTION_HANDLERS = {
  [FETCH_USER_INFO_PAGE_BEGIN]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, { loading: true });
  },
  [FETCH_USER_INFO_PAGE_SUCCESS]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, {
      userInfoPage: action.payload,
      loading: false,
    });
  },
  [FETCH_USER_INFO_PAGE_FAILED]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, { error: action.payload, loading: false });
  },
  [PAGE_NUM_CHANGE]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, { pageNum: action.payload });
  },
  [PAGE_SIZE_CHANGE]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, { pageSize: action.payload });
  },
  [SEARCH_FIELD_CHANGE]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, { userFilter: action.payload });
  },
};

export const UserListReducer = (state = initialState, action: any) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
