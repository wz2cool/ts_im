import { combineReducers } from "redux";
import { UserListReducer } from "./user-list.reducer";

export const userManagementReducer = combineReducers({
  UserListReducer,
});
