import * as React from "react";
import { UserFilterDto, UserInfoPageDto } from "../../../../models/dto";
import { Table, Layout, Form, Input, Button, Select } from "antd";
import { StringUtils, ObjectUtils } from "ts-commons";
import * as lodash from "lodash";
import CreateUserModal from "../create-user-modal";

import "./style.scss";

const FormItem = Form.Item;

export interface StateToProps {
  loading: boolean;
  userInfoPage: UserInfoPageDto;
  userFilter: UserFilterDto;
  error?: Error;
  pageNum: number;
  pageSize: number;
}

export interface DispatchToProps {
  fetchUserInfoPage: (filter: UserFilterDto, pageNum: number, pageSize: number) => void;
  pageNumChange: (pageNum: number) => void;
  pageSizeChange: (pageSize: number) => void;
  searchFieldChange: (filter: UserFilterDto) => void;
}

interface UserListState {
  createUserModalVisible: boolean;
  createUserModalClosed: () => void;
}

interface UserListProps extends StateToProps, DispatchToProps {}

export class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    this.state = { createUserModalVisible: false, createUserModalClosed: this.createUserModalClosed };
  }

  componentDidMount(): void {
    if (!this.props.userInfoPage.entites || this.props.userInfoPage.entites.length === 0) {
      this.props.fetchUserInfoPage(this.props.userFilter, this.props.pageNum, this.props.pageSize);
    }
  }

  public render(): JSX.Element {
    console.log(this.props);
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
      <div>
        <Layout className="layout_user_management">
          <Layout.Header>
            <Form className="user_search_form" layout="inline">
              <FormItem label="用户名">
                <Input name="userName" value={this.props.userFilter.userName} onChange={e => this.searchFieldChange(e.target.name, e.target.value)} />
              </FormItem>
              <FormItem label="别名">
                <Input
                  name="displayName"
                  value={this.props.userFilter.displayName}
                  onChange={e => this.searchFieldChange(e.target.name, e.target.value)}
                />
              </FormItem>
              <FormItem label="手机">
                <Input name="mobile" value={this.props.userFilter.mobile} onChange={e => this.searchFieldChange(e.target.name, e.target.value)} />
              </FormItem>
              <FormItem label="邮箱">
                <Input
                  name="email"
                  defaultValue={this.props.userFilter.email}
                  onChange={e => this.searchFieldChange(e.target.name, e.target.value)}
                />
              </FormItem>
              <FormItem label="来源">
                <Select
                  className="source_select"
                  value={this.props.userFilter.source || -1}
                  onChange={value => {
                    this.searchFieldChange("source", value);
                  }}
                >
                  <Select.Option value={-1}>全部</Select.Option>
                  <Select.Option value={1}>网站注册</Select.Option>
                  <Select.Option value={2}>手机注册</Select.Option>
                </Select>
              </FormItem>
              <FormItem label="状态">
                <Select
                  className="status_select"
                  value={this.props.userFilter.active || -1}
                  onChange={value => {
                    this.searchFieldChange("active", value);
                  }}
                >
                  <Select.Option value={-1}>全部</Select.Option>
                  <Select.Option value={0}>未审核</Select.Option>
                  <Select.Option value={1}>已审核</Select.Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" icon="search" onClick={this.search} loading={this.props.loading}>
                  搜索
                </Button>
              </FormItem>
              <FormItem>
                <Button type="default" icon="reload" onClick={() => this.clearFilter()}>
                  清空
                </Button>
              </FormItem>
              <FormItem>
                <Button type="primary" icon="plus-circle-o" onClick={() => this.showCreateUserModal()}>
                  添加
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
        <CreateUserModal visible={this.state.createUserModalVisible} closed={this.state.createUserModalClosed} />
      </div>
    );
  }

  private pageNumChange = (pageNum: number) => {
    this.props.pageNumChange(pageNum);
    this.props.fetchUserInfoPage(this.props.userFilter, pageNum, this.props.pageSize);
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
    } else if (ObjectUtils.isString(value) && StringUtils.isBlank(value as string)) {
      useValue = undefined;
    } else {
      useValue = value;
    }
    filter[fieldName] = useValue;
    const newFilter = lodash.assign({}, filter);
    this.props.searchFieldChange(newFilter);
  };

  private search = () => {
    // search need rest pagenum to 1;
    const newPageNum = 1;
    this.props.pageNumChange(newPageNum);
    this.props.fetchUserInfoPage(this.props.userFilter, newPageNum, this.props.pageSize);
  };

  private clearFilter = () => {
    const emptyFilter = new UserFilterDto();
    this.props.searchFieldChange(emptyFilter);
    this.props.fetchUserInfoPage(emptyFilter, this.props.pageNum, this.props.pageSize);
  };

  private showCreateUserModal = () => {
    this.setState({ createUserModalVisible: true });
  };

  private createUserModalClosed = () => {
    this.setState({ createUserModalVisible: false });
    // force refresh.
    const newFilter = lodash.assign({}, this.props.userFilter);
    this.props.fetchUserInfoPage(newFilter, this.props.pageNum, this.props.pageSize);
  };
}
