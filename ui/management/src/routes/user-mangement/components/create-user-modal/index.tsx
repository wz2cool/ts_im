import * as React from "react";

import { Modal, Form, Input, Button, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ObjectUtils, RegexUtils, StringUtils } from "ts-commons";
import { CommonsHelper } from "../../../../helpers";
import { CreateUserDto } from "../../../../models/dto";
import { UserHttpService } from "../../../../services/user-http.service";

const httpService = UserHttpService.getInstance();

interface CreateUserModalState {
  loading: boolean;
  confirmDirty: boolean;
  visible: boolean;
}

interface CreateUserModalProps extends FormComponentProps {
  visible?: boolean;
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

class CreateUserModal extends React.Component<CreateUserModalProps, CreateUserModalState> {
  constructor(props: CreateUserModalProps) {
    super(props);
    this.state = {
      loading: false,
      confirmDirty: false,
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps: CreateUserModalProps) {
    const nextVisible: boolean = ObjectUtils.isNullOrUndefined(nextProps.visible) ? false : (nextProps.visible as boolean);
    if (nextVisible !== this.state.visible) {
      this.setState({ visible: nextVisible });
    }
  }

  createUser = async (values: any) => {
    const dto = new CreateUserDto();
    dto.displayName = values.displayName;
    dto.email = values.email;
    dto.imageUrl = values.imageUrl;
    dto.mobile = values.mobile;
    dto.password = values.password;
    dto.userName = values.username;
    dto.source = 1;

    this.setState({ loading: true });
    try {
      await httpService.createUser(dto);
      this.setState({ visible: false });
    } catch (e) {
      let errMsg = "未知错误: " + e.message;
      console.log(e);
      if (!ObjectUtils.isNullOrUndefined(e.response) && !ObjectUtils.isNullOrUndefined(e.response.data) && !ObjectUtils.isNullOrUndefined(e.response.data.message)) {
        errMsg = e.response.data.message;
      }
      message.error(errMsg);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = (e: any) => {
    console.log("handleSubmit");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (ObjectUtils.isNullOrUndefined(err)) {
        console.log("Received values of form: ", values);
        this.createUser(values);
      }
    });
  };

  handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateUsername = (rule: any, value: any, callback: any, source?: any, options?: any) => {
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

  validateEmail = (rule: any, value: any, callback: any, source?: any, options?: any) => {
    if (ObjectUtils.isString(value) && RegexUtils.validateEmail(value)) {
      callback();
    } else {
      if (StringUtils.isNotBlank(value)) {
        callback("请输入有效的邮箱！");
      } else {
        callback();
      }
    }
  };

  validateMobile = (rule: any, value: any, callback: any, source?: any, options?: any) => {
    if (ObjectUtils.isString(value) && CommonsHelper.isMobile(value)) {
      callback();
    } else {
      if (StringUtils.isNotBlank(value)) {
        callback("请输入有效手机号！");
      } else {
        callback();
      }
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any, source?: any, options?: any) => {
    const form = this.props.form;
    if (!ObjectUtils.isNullOrUndefined(value) && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true }, () => {});
    }
    callback();
  };

  compareToFirstPassword = (rule: any, value: any, callback: any, source?: any, options?: any) => {
    const form = this.props.form;
    if (!ObjectUtils.isNullOrUndefined(value) && value !== form.getFieldValue("password")) {
      callback("两次密码不匹配!");
    } else {
      callback();
    }
  };

  handleModalCanal = () => {
    this.setState({ visible: false });
  };

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal destroyOnClose={false} maskClosable={false} title="添加用户" visible={this.state.visible} footer={null} onCancel={this.handleModalCanal}>
        <Form onSubmit={this.handleSubmit}>
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
                {
                  validator: this.validateEmail,
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
                  validator: this.validateMobile,
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
            {getFieldDecorator("displayName", {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(CreateUserModal);
