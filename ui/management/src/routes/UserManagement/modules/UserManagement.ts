import * as lodash from "lodash";
import { UserHttpService } from "../services";

import { UserInfoPageDto, UserFilterDto } from "../../../models/dto";
import { Dispatch, AnyAction } from "redux";
import { UserManagementState } from "../components/UserManagement";

const userHttpService = UserHttpService.getInstance();
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_INFO_PAGE_BEGIN = "FETCH_USER_INFO_PAGE_BEGIN";
export const FETCH_USER_INFO_PAGE_SUCCESS = "FETCH_USER_INFO_PAGE_SUCCESS";
export const FETCH_USER_INFO_PAGE_FAILED = "FETCH_USER_INFO_PAGE_FAILED";

// ------------------------------------
// Actions
// ------------------------------------
export const fetchUserInfoPageBegin = () => {
  return {
    type: FETCH_USER_INFO_PAGE_BEGIN,
  };
};

export const fetchUserInfoPageSuccess = (value: UserInfoPageDto) => {
  return {
    type: FETCH_USER_INFO_PAGE_SUCCESS,
    payload: value,
  };
};

export const fetchUserInfoPageFailed = (value: Error) => {
  return {
    type: FETCH_USER_INFO_PAGE_FAILED,
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
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_INFO_PAGE_BEGIN]: (
    state: UserManagementState,
    action: AnyAction,
  ) => {
    return lodash.assign(state, { loading: true });
  },
  [FETCH_USER_INFO_PAGE_SUCCESS]: (
    state: UserManagementState,
    action: AnyAction,
  ) => {
    return lodash.assign(state, {
      userInfoPage: action.payload,
      loading: false,
    });
  },
  [FETCH_USER_INFO_PAGE_FAILED]: (
    state: UserManagementState,
    action: AnyAction,
  ) => {
    return lodash.assign(state, { error: action.payload, loading: false });
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: UserManagementState = {
  loading: false,
  userInfoPage: new UserInfoPageDto(),
  error: undefined,
};

export function reducer(state = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
