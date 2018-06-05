import * as lodash from "lodash";
import { UserHttpService } from "../services";

import { UserInfoPageDto, UserFilterDto } from "../../../models/dto";
import { Dispatch, AnyAction } from "redux";
import { ActionPayload } from "../../../models/interface";

const userHttpService = UserHttpService.getInstance();
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_INFO_PAGE_BEGIN = "FETCH_USER_INFO_PAGE_BEGIN";
export const FETCH_USER_INFO_PAGE_SUCCESS = "FETCH_USER_INFO_PAGE_SUCCESS";
export const FETCH_USER_INFO_PAGE_FAILED = "FETCH_USER_INFO_PAGE_FAILED";
export const PAGE_NUM_CHANGE = "PAGE_NUM_CHANGE";
export const PAGE_SIZE_CHANGE = "PAGE_SIZE_CHANGE";

// ------------------------------------
// Actions
// ------------------------------------
export const fetchUserInfoPageBegin = (): ActionPayload => {
  return {
    type: FETCH_USER_INFO_PAGE_BEGIN,
  };
};

export const fetchUserInfoPageSuccess = (
  value: UserInfoPageDto,
): ActionPayload => {
  return {
    type: FETCH_USER_INFO_PAGE_SUCCESS,
    payload: value,
  };
};

export const fetchUserInfoPageFailed = (value: Error): ActionPayload => {
  return {
    type: FETCH_USER_INFO_PAGE_FAILED,
    payload: value,
  };
};

export const pageNumChange = (value: number): ActionPayload => {
  return {
    type: PAGE_NUM_CHANGE,
    payload: value,
  };
};

export const pageSizeChange = (value: number): ActionPayload => {
  return {
    type: PAGE_SIZE_CHANGE,
    payload: value,
  };
};

export const fetchUserInfoPage = (
  filter: UserFilterDto,
  pageNum: number,
  pageSize: number,
) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchUserInfoPageBegin());
    return userHttpService
      .getUserInfosByFilter(filter, pageNum, pageSize)
      .then(response => {
        dispatch(fetchUserInfoPageSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchUserInfoPageFailed(err));
      });
  };
};

export const actions = {
  fetchUserInfoPageBegin,
  fetchUserInfoPageSuccess,
  fetchUserInfoPageFailed,
  pageNumChange,
  pageSizeChange,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
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
    console.log("page size change: ", action.payload);
    return lodash.assign({}, state, { pageSize: action.payload });
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
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

export function reducer(state = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
