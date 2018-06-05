import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserManagement, {
  StateToProps,
  DispatchToProps,
  UserManagementState,
} from "../components/UserManagement";
import { fetchUserInfoPage } from "../modules/UserManagement";
import { UserFilterDto } from "../../../models/dto";

const mapStateToProps = (state: any): StateToProps => {
  const myState = state.userManagement as UserManagementState;
  console.log("myState");
  console.log(myState);
  return {
    loading: myState.loading,
    userInfoPage: myState.userInfoPage,
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
  };
};

const UserManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagement);

export default withRouter(UserManagementContainer);
