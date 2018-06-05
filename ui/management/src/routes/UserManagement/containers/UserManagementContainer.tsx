import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserManagement, {
  StateToProps,
  DispatchToProps,
} from "../components/UserManagement";
import {
  fetchUserInfoPage,
  ReducerState,
  pageNumChange,
  pageSizeChange,
} from "../modules/UserManagement";
import { UserFilterDto } from "../../../models/dto";

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
    fetchUserInfoPage: (
      filter: UserFilterDto,
      pageNum: number,
      pageSize: number,
    ) => dispatch(fetchUserInfoPage(filter, pageNum, pageSize)),
    pageNumChange: (pageNum: number) => dispatch(pageNumChange(pageNum)),
    pageSizeChange: (pageSize: number) =>
      dispatch(pageSizeChange(pageSize)),
  };
};

const UserManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagement);

export default withRouter(UserManagementContainer);
