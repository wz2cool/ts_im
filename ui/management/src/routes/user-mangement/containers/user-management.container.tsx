import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import * as React from "react";

interface UserManagementProps extends RouteComponentProps<any> {}

interface UserManagementState {}

export class UserManagement extends React.Component<UserManagementProps, UserManagementState> {
  public render(): JSX.Element {
    return <span>UserManagement</span>;
  }
}

const UserManagementContainer = connect()(UserManagement);
export default withRouter(UserManagementContainer);
