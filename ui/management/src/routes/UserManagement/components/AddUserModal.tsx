import * as React from "react";

import { Modal, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";

interface AddUserModalState {}

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
  }

  public render(): JSX.Element {
    return (
      <Modal title="添加用户" visible={true}>
        <Form>
          <Form.Item {...formItemLayout} label="E-mail">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} label="E-mail">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} label="E-mail">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} label="E-mail">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} label="E-mail">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddUserModal);
