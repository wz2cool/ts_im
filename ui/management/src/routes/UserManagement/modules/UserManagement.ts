import * as lodash from 'lodash';

import { UserInfoPageDto } from "../../../models/dto";

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_INFO_PAGE_BEGIN = "FETCH_USER_INFO_PAGE_BEGIN";
export const FETCH_USER_INFO_PAGE_SUCCESS = "FETCH_USER_INFO_PAGE_SUCCESS";

// ------------------------------------
// Actions
// ------------------------------------
export function fetchUserInfoPageBegin(value = true) {
  return {
    type: FETCH_USER_INFO_PAGE_BEGIN,
    payload: value,
  };
}

export function fetchUserInfoPageSuccess(value: UserInfoPageDto) {
  return {
    type: FETCH_USER_INFO_PAGE_SUCCESS,
    payload: value,
  };
}

export const actions = {
  fetchUserInfoPageBegin,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_INFO_PAGE_BEGIN]: (state: UserManagementState, action: any) => { lodash.assign(state, { loading: action.payload }) },
};

// ------------------------------------
// Reducer
// ------------------------------------
export interface UserManagementState {
  loading: boolean;
  userInfoPage?: UserInfoPageDto;
  error?: Error;
}

const initialState: UserManagementState = {
  loading: false,
  userInfoPage: undefined,
  error: undefined,
};

export function reducer(state = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
