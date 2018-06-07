import * as React from "react";

import { Table, Layout, Form, Input, Button, Select } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { UserFilterDto, UserInfoPageDto } from "../../../models/dto";
import { StringUtils, ObjectUtils } from "ts-commons";

const FormItem = Form.Item;
import "./style.scss";

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
  searchFieldChange: (filter: UserFilterDto) => void;
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
      <Layout className="layout_user_management">
        <Layout.Header>
          <Form className="user_search_form" layout="inline">
            <FormItem label="用户名">
              <Input
                name="userName"
                defaultValue={this.props.userFilter.userName}
                onChange={e =>
                  this.searchFieldChange(e.target.name, e.target.value)
                }
              />
            </FormItem>
            <FormItem label="别名">
              <Input
                name="displayName"
                defaultValue={this.props.userFilter.displayName}
                onChange={e =>
                  this.searchFieldChange(e.target.name, e.target.value)
                }
              />
            </FormItem>
            <FormItem label="手机">
              <Input
                name="mobile"
                defaultValue={this.props.userFilter.mobile}
                onChange={e =>
                  this.searchFieldChange(e.target.name, e.target.value)
                }
              />
            </FormItem>
            <FormItem label="邮箱">
              <Input
                name="email"
                defaultValue={this.props.userFilter.email}
                onChange={e =>
                  this.searchFieldChange(e.target.name, e.target.value)
                }
              />
            </FormItem>
            <FormItem label="来源">
              <Select
                className="source_select"
                defaultValue={this.props.userFilter.source || 0}
                onChange={value => {
                  this.searchFieldChange("source", value);
                }}
              >
                <Select.Option value={0}>全部</Select.Option>
                <Select.Option value={1}>网站注册</Select.Option>
                <Select.Option value={2}>手机注册</Select.Option>
              </Select>
            </FormItem>
            <FormItem label="状态">
              <Select
                className="status_select"
                defaultValue={this.props.userFilter.active || 0}
                onChange={value => {
                  this.searchFieldChange("active", value);
                }}
              >
                <Select.Option value={0}>全部</Select.Option>
                <Select.Option value={1}>未审核</Select.Option>
                <Select.Option value={2}>已审核</Select.Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Form>
        </Layout.Header>
        <Layout.Content>
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
        </Layout.Content>
      </Layout>
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

  private searchFieldChange = (fieldName: string, value: any) => {
    const filter = this.props.userFilter;
    let useValue;

    if (ObjectUtils.isNullOrUndefined(value) || value === 0) {
      useValue = undefined;
    } else if (
      ObjectUtils.isString(value) &&
      StringUtils.isBlank(value as string)
    ) {
      useValue = undefined;
    } else {
      useValue = value;
    }
    filter[fieldName] = useValue;
    this.props.searchFieldChange(filter);
  };
}

export default UserManagement;
