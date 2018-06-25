import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UserManagement } from "../components/user-management";

const UserManagementContainer = connect()(UserManagement);
export default withRouter(UserManagementContainer);
