import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

 interface UserManagementProps extends RouteComponentProps<any> {}

interface UserManagementState {}

export class UserManagement extends React.Component<UserManagementProps, UserManagementState> {
  public render(): JSX.Element {
    return <span>UserManagement</span>;
  }
}
