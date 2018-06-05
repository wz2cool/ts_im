import * as React from "react";

import { Table } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { UserFilterDto, UserInfoPageDto } from "../../../models/dto";

export interface StateToProps {
  loading: boolean;
  userInfoPage: UserInfoPageDto;
  userFilter: UserFilterDto;
  error?: Error;
  pageNum: number;
  pageSize: number;
}

export interface DispatchToProps {
  fetchUserInfoPage: (
    filter: UserFilterDto,
    pageNum: number,
    pageSize: number,
  ) => void;
  pageNumChange: (pageNum: number) => void;
  pageSizeChange: (pageSize: number) => void;
}

export interface OwnProps extends RouteComponentProps<any> {}
export interface UserManagementProps
  extends StateToProps,
    DispatchToProps,
    OwnProps {}

// local state
export interface UserManagementState {
  // loading: boolean;
  // userInfoPage: UserInfoPageDto;
  // userFilter: UserFilterDto;
  // error?: Error;
  // pageNum: number;
  // pageSize: number;
}

class UserManagement extends React.Component<
  UserManagementProps,
  UserManagementState
> {
  componentDidMount(): void {
    if (
      !this.props.userInfoPage.entites ||
      this.props.userInfoPage.entites.length === 0
    ) {
      this.props.fetchUserInfoPage(
        this.props.userFilter,
        this.props.pageNum,
        this.props.pageSize,
      );
    }
  }

  public render(): JSX.Element {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "用户名",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "别名",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "手机",
        dataIndex: "mobile",
        key: "mobile",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.props.userInfoPage.entites}
        loading={this.props.loading}
        pagination={{
          pageSizeOptions: ["1", "2", "10", "20", "30", "40", "50"],
          showQuickJumper: true,
          showSizeChanger: true,
          current: this.props.pageNum,
          pageSize: this.props.userInfoPage.pageSize,
          total: this.props.userInfoPage.total,
          onChange: this.pageNumChange,
          onShowSizeChange: this.pageSizeChange,
        }}
      />
    );
  }

  private pageNumChange = (pageNum: number) => {
    this.props.pageNumChange(pageNum);
    this.props.fetchUserInfoPage(
      this.props.userFilter,
      pageNum,
      this.props.pageSize,
    );
  };

  private pageSizeChange = (pageNum: number, pageSize: number) => {
    this.props.pageNumChange(pageNum);
    this.props.pageSizeChange(pageSize);
    this.props.fetchUserInfoPage(this.props.userFilter, pageNum, pageSize);
  };
}

export default UserManagement;
