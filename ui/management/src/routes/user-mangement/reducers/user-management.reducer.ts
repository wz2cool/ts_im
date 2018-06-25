import { combineReducers } from "redux";
import { UserListReducer } from "./user-list.reducer";

export const userManagmentReducer = combineReducers({
  UserListReducer,
});
