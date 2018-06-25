import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import * as React from "react";
import { UserListContainer } from "./user-list.container";
import { userManagementReducer } from "../reducers/user-management.reducer";
export { userManagementReducer };

interface UserManagementProps extends RouteComponentProps<any> {}

interface UserManagementState {}

export class UserManagement extends React.Component<UserManagementProps, UserManagementState> {
  public render(): JSX.Element {
    return <UserListContainer />;
  }
}

const UserManagementContainer = connect()(UserManagement);
export default withRouter(UserManagementContainer);
