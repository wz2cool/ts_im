import * as React from "react";

import { Form, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { ObjectUtils, RegexUtils, StringUtils } from "ts-commons";
import { CommonsHelper } from "../../../../helpers";
import { CreateUserDto } from "../../../../models/dto";
import { UserHttpService } from "../../../../services/user-http.service";
import { getView } from "./view";

const httpService = UserHttpService.getInstance();

interface CreateUserModalState {
  loading: boolean;
  confirmDirty: boolean;
  visible: boolean;
}

interface CreateUserModalProps extends FormComponentProps {
  visible?: boolean;
  closed?: () => void;
}

export class CreateUserModal extends React.Component<CreateUserModalProps, CreateUserModalState> {
  constructor(props: CreateUserModalProps) {
    super(props);
    this.state = {
      loading: false,
      confirmDirty: false,
      visible: false,
    };
  }

  public render(): JSX.Element {
    return getView(this);
  }

  componentWillReceiveProps(nextProps: CreateUserModalProps) {
    const nextVisible: boolean = ObjectUtils.isNullOrUndefined(nextProps.visible) ? false : (nextProps.visible as boolean);
    if (nextVisible !== this.state.visible) {
      this.setState({ visible: nextVisible });
    }
  }

  componentDidUpdate(prevProps: CreateUserModalProps, prevState: CreateUserModalState) {
    if (prevState.visible === true && this.state.visible === false) {
      if (this.props.closed) {
        this.props.closed();
      }
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
      if (
        !ObjectUtils.isNullOrUndefined(e.response) &&
        !ObjectUtils.isNullOrUndefined(e.response.data) &&
        !ObjectUtils.isNullOrUndefined(e.response.data.message)
      ) {
        errMsg = e.response.data.message;
      }
      message.error(errMsg);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (ObjectUtils.isNullOrUndefined(err)) {
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
}

export default Form.create()(CreateUserModal);
