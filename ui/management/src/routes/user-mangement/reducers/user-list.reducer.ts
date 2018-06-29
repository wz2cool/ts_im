import { UserFilterDto } from "../../../models/dto";
import { AnyAction } from "redux";
import * as lodash from "lodash";
import { SEARCH_FIELD_CHANGE } from "../actions/user-list.action";

export interface ReducerState {
  userFilter: UserFilterDto;
}

const initialState: ReducerState = {
  userFilter: new UserFilterDto(),
};

const ACTION_HANDLERS = {
  [SEARCH_FIELD_CHANGE]: (state: ReducerState, action: AnyAction) => {
    return lodash.assign({}, state, { userFilter: action.payload });
  },
};

export const UserListReducer = (state = initialState, action: any) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
