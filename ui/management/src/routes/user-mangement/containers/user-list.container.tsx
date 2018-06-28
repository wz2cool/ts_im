import { connect } from "react-redux";
import { StateToProps, DispatchToProps, UserList } from "../components/user-list";
import { ReducerState } from "../reducers/user-list.reducer";
import { UserFilterDto } from "../../../models/dto";
import { searchFieldChange } from "../actions/user-list.action";

const mapStateToProps = (state: any): StateToProps => {
  const myState: ReducerState = state.userManagement.UserListReducer;
  const result = {
    userFilter: myState.userFilter,
  };
  return result;
};

const mapDispatchToProps = (dispatch: any): DispatchToProps => {
  return {
    searchFieldChange: (filter: UserFilterDto) => dispatch(searchFieldChange(filter)),
  };
};

export const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
