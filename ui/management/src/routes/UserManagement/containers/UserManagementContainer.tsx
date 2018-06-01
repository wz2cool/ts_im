import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserManagement from "../components/UserManagement";
import { locationChange } from "../../../store/location";

const mapStateToProps = (state: any) => {
    return { hello: "hello", state };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        locationChange: () => dispatch(locationChange("/home")),
    };
};

const UserManagementContainer: any = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserManagement);

export default withRouter(UserManagementContainer);
