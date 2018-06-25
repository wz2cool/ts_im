import { connect } from "react-redux";
import { StateToProps, DispatchToProps, UserList } from "../components/user-list";
import { ReducerState } from "../reducers/user-list.reducer";
import { UserFilterDto } from "../../../models/dto";
import { fetchUserInfoPage, pageNumChange, pageSizeChange, searchFieldChange } from "../actions/user-list.action";

const mapStateToProps = (state: any): StateToProps => {
  const myState: ReducerState = state.userManagement;
  return {
    loading: myState.loading,
    userInfoPage: myState.userInfoPage,
    userFilter: myState.userFilter,
    pageNum: myState.pageNum,
    pageSize: myState.pageSize,
    error: myState.error,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchToProps => {
  return {
    fetchUserInfoPage: (filter: UserFilterDto, pageNum: number, pageSize: number) => dispatch(fetchUserInfoPage(filter, pageNum, pageSize)),
    pageNumChange: (pageNum: number) => dispatch(pageNumChange(pageNum)),
    pageSizeChange: (pageSize: number) => dispatch(pageSizeChange(pageSize)),
    searchFieldChange: (filter: UserFilterDto) => dispatch(searchFieldChange(filter)),
  };
};

export const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
