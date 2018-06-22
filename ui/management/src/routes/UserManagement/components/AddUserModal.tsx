import * as React from "react";

import { Modal, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ObjectUtils, RegexUtils, StringUtils } from "ts-commons";

interface AddUserModalState {
  confirmDirty: boolean;
}

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

class AddUserModal extends React.Component<
  FormComponentProps,
  AddUserModalState
> {
  componentDidMount() {
    this.props.form.validateFields();
    this.setState({ confirmDirty: false });
  }

  handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateUsername = (
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any,
  ) => {
    if (ObjectUtils.isString(value) && RegexUtils.validateUsername(value)) {
      callback();
    } else {
      if (StringUtils.isNotBlank(value)) {
        callback("请输入3-18位字符！");
      } else {
        callback();
      }
    }
  };

  validateToNextPassword = (
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any,
  ) => {
    const form = this.props.form;
    if (!ObjectUtils.isNullOrUndefined(value) && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true }, () => {});
    }
    callback();
  };

  compareToFirstPassword = (
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any,
  ) => {
    const form = this.props.form;
    if (
      !ObjectUtils.isNullOrUndefined(value) &&
      value !== form.getFieldValue("password")
    ) {
      callback("两次密码不匹配!");
    } else {
      callback();
    }
  };

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title="添加用户" visible={true}>
        <Form>
          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "请填写用户名！",
                },
                {
                  validator: this.validateUsername,
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
                  validator: this.validateToNextPassword,
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
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="昵称">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddUserModal);
