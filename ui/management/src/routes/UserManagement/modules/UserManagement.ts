// ------------------------------------
// Constants
// ------------------------------------
export const USER_MANAGEMENT = "USER_MANAGEMENT";

// ------------------------------------
// Actions
// ------------------------------------
export function userManagement(value = "USER_MANAGEMENT") {
  return {
    type: USER_MANAGEMENT,
    payload: value,
  };
}

export const actions = {
  userManagement,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_MANAGEMENT]: (state: any, action: any) => action.payload,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = "";
export function reducer(state = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}