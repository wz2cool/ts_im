import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserManagement, {
  StateToProps,
  DispatchToProps,
} from "../components/UserManagement";
import { fetchUserInfoPage } from "../modules/UserManagement";
import { UserFilterDto } from "../../../models/dto";

const mapStateToProps = (state: any): StateToProps => {
  return state;
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
