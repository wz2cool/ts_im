import { withRouter } from "react-router-dom";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

export interface UserManagementProps extends RouteComponentProps<any> {}

interface UserManagementState {}

class UserManagement extends React.Component<UserManagementProps, UserManagementState> {
  public render(): JSX.Element {
    return <span>UserManagement</span>;
  }
}

const UserManagementContainer = connect()(UserManagement);

export default withRouter(UserManagementContainer);
