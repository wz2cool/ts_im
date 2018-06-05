import * as React from "react";

import { Table, Icon, Divider } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { UserFilterDto, UserInfoPageDto } from "../../../models/dto";

export interface StateToProps {
  loading: boolean;
  userInfoPage: UserInfoPageDto;
  error?: Error;
}

export interface DispatchToProps {
  fetchUserInfoPage: (
    filter: UserFilterDto,
    pageNum: number,
    pageSize: number,
  ) => void;
}

export interface OwnProps extends RouteComponentProps<any> {}
export interface UserManagementProps
  extends StateToProps,
    DispatchToProps,
    OwnProps {}

export interface UserManagementState {
  loading: boolean;
  userInfoPage: UserInfoPageDto;
  error?: Error;
}

class UserManagement extends React.Component<
  UserManagementProps,
  UserManagementState
> {
  componentDidMount(): void {
    const filter = new UserFilterDto();
    this.props.fetchUserInfoPage(filter, 1, 10);
  }

  public render(): JSX.Element {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: string) => <a href="javascript:;">{text}</a>,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Action",
        key: "action",
        render: (text: string, record: any) => (
          <span>
            <a href="javascript:;">Action 一 {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
            <Divider type="vertical" />
            <a href="javascript:;" className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        loading={this.props.loading}
        pagination={{
        
        }}
      />
    );
  }
}

export default UserManagement;
