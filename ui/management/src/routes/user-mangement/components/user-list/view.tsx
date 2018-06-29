import { UserList } from "./index";

import * as React from "react";
import CreateUserModal from "../create-user-modal";
import { Layout, Form, Input, Button, Select } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { UserInfoDto } from "../../../../models/dto";
import { ObjectUtils, StringUtils } from "ts-commons";
import "./style.scss";

const getSourceString = (source: number) => {
  if (source === 1) {
    return "网站注册";
  } else if (source === 2) {
    return "手机注册";
  } else {
    return "来源未知";
  }
};

const getActiveString = (active: number) => {
  if (active === 0) {
    return "未审核";
  } else if (active === 1) {
    return "已审核";
  } else {
    return "未知";
  }
};

const getView = (component: UserList): JSX.Element => {
  const that = component;
  const columns: ColumnProps<UserInfoDto>[] = [
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
    {
      title: "来源",
      key: "source",
      dataIndex: "source",
      render: (text, record, index) => {
        return <div>{getSourceString(record.source)}</div>;
      },
    },
    {
      title: "状态",
      key: "active",
      dataIndex: "active",
      render: (text, record, index) => {
        return <div>{getActiveString(record.active)}</div>;
      },
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <div>
            {!record.active && (
              <Button className="active_button" type="default" size="small" onClick={() => that.activeUser(record.id)}>
                审核
              </Button>
            )}
            <Button type="danger" size="small" onClick={() => that.handleDeleteUser(record)}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Layout className="layout_user_management">
        <Layout.Header>
          <Form className="user_search_form" layout="inline">
            <Form.Item label="用户名">
              <Input name="userName" value={that.props.userFilter.userName} onChange={e => that.searchFieldChange(e.target.name, e.target.value)} />
            </Form.Item>
            <Form.Item label="别名">
              <Input
                name="displayName"
                value={that.props.userFilter.displayName}
                onChange={e => that.searchFieldChange(e.target.name, e.target.value)}
              />
            </Form.Item>
            <Form.Item label="手机">
              <Input name="mobile" value={that.props.userFilter.mobile} onChange={e => that.searchFieldChange(e.target.name, e.target.value)} />
            </Form.Item>
            <Form.Item label="邮箱">
              <Input name="email" defaultValue={that.props.userFilter.email} onChange={e => that.searchFieldChange(e.target.name, e.target.value)} />
            </Form.Item>
            <Form.Item label="来源">
              <Select
                className="source_select"
                value={ObjectUtils.toSafeString(that.props.userFilter.source)}
                onChange={value => {
                  const valueStr = value.toString();
                  const useValue = StringUtils.isNotBlank(valueStr) ? parseInt(valueStr) : undefined;
                  that.searchFieldChange("source", useValue);
                }}
              >
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">网站注册</Select.Option>
                <Select.Option value="2">手机注册</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="状态">
              <Select
                className="status_select"
                value={ObjectUtils.toSafeString(that.props.userFilter.active)}
                onChange={value => {
                  const valueStr = value.toString();
                  const useValue = StringUtils.isNotBlank(valueStr) ? parseInt(valueStr) : undefined;
                  that.searchFieldChange("active", useValue);
                }}
              >
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="0">未审核</Select.Option>
                <Select.Option value="1">已审核</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="search" onClick={that.search}>
                搜索
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" icon="reload" onClick={() => that.clearFilter()}>
                清空
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon="plus-circle-o" onClick={() => that.showCreateUserModal()}>
                添加
              </Button>
            </Form.Item>
          </Form>
        </Layout.Header>
        <Layout.Content>
          <Table
            columns={columns}
            dataSource={that.state.userInfoPage.entites}
            loading={that.state.loading}
            pagination={{
              pageSizeOptions: ["1", "2", "10", "20", "30", "40", "50"],
              showQuickJumper: true,
              showSizeChanger: true,
              current: that.state.pageNum,
              pageSize: that.state.userInfoPage.pageSize,
              total: that.state.userInfoPage.total,
              onChange: that.pageNumChange,
              onShowSizeChange: that.pageSizeChange,
            }}
          />
        </Layout.Content>
      </Layout>
      <CreateUserModal visible={that.state.createUserModalVisible} closed={that.state.createUserModalClosed} />
    </div>
  );
};

export { getView };
