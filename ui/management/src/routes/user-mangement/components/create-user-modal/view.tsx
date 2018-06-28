import { CreateUserModal } from "./index";
import * as React from "react";
import { Modal, Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const getView = (component: CreateUserModal): JSX.Element => {
  const that = component;
  const { getFieldDecorator } = that.props.form;
  return (
    <Modal destroyOnClose={true} maskClosable={false} title="添加用户" visible={that.state.visible} footer={null} onCancel={that.handleModalCanal}>
      <Form onSubmit={that.handleSubmit}>
        <Form.Item {...formItemLayout} label="用户名">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请填写用户名！",
              },
              {
                validator: that.validateUsername,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="邮箱">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "请填写邮箱！",
              },
              {
                validator: that.validateEmail,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="手机">
          {getFieldDecorator("mobile", {
            rules: [
              {
                required: true,
                message: "请填写手机号！",
              },
              {
                validator: that.validateMobile,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请填写密码！",
              },
              {
                validator: that.validateToNextPassword,
              },
            ],
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="确认密码">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "请填写确认密码！",
              },
              {
                validator: that.compareToFirstPassword,
              },
            ],
          })(<Input type="password" onBlur={that.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="昵称">
          {getFieldDecorator("displayName", {
            rules: [],
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button type="primary" htmlType="submit" loading={that.state.loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { getView };
