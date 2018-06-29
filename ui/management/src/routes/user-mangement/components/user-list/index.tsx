import * as React from "react";
import { UserFilterDto, UserInfoPageDto, UserInfoDto } from "../../../../models/dto";
import { Modal, message } from "antd";
import * as lodash from "lodash";
import { getView } from "./view";
import { UserHttpService } from "../../../../services";
import { ObjectUtils } from "ts-commons";

const confirm = Modal.confirm;
const userHttpService = UserHttpService.getInstance();

export interface StateToProps {
  userFilter: UserFilterDto;
}

export interface DispatchToProps {
  searchFieldChange: (filter: UserFilterDto) => void;
}

interface UserListState {
  createUserModalVisible: boolean;
  createUserModalClosed: () => void;
  userInfoPage: UserInfoPageDto;
  loading: boolean;
  pageNum: number;
  pageSize: number;
}

interface UserListProps extends StateToProps, DispatchToProps {}

export class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props);
    const userInfoPage = new UserInfoPageDto();
    userInfoPage.entites = [];
    this.state = {
      createUserModalVisible: false,
      createUserModalClosed: this.createUserModalClosed,
      userInfoPage: userInfoPage,
      loading: false,
      pageNum: 1,
      pageSize: 10,
    };
  }

  componentDidMount(): void {
    this.fetchUserInfoPage(this.props.userFilter, this.state.pageNum, this.state.pageSize);
  }

  public render(): JSX.Element {
    return getView(this);
  }

  pageNumChange = (pageNum: number) => {
    this.setState({
      pageNum: pageNum,
    });
    this.fetchUserInfoPage(this.props.userFilter, pageNum, this.state.pageSize);
  };

  pageSizeChange = (pageNum: number, pageSize: number) => {
    this.setState({
      pageNum: pageNum,
      pageSize: pageSize,
    });
    this.fetchUserInfoPage(this.props.userFilter, pageNum, pageSize);
  };

  searchFieldChange = (fieldName: string, value: any) => {
    const filter = this.props.userFilter;
    filter[fieldName] = value;
    const newFilter = lodash.assign({}, filter);
    this.props.searchFieldChange(newFilter);
  };

  search = () => {
    // search need rest pagenum to 1;
    const newPageNum = 1;
    this.setState({ pageNum: newPageNum });
    this.fetchUserInfoPage(this.props.userFilter, newPageNum, this.state.pageSize);
  };

  clearFilter = () => {
    const emptyFilter = new UserFilterDto();
    this.props.searchFieldChange(emptyFilter);
    this.fetchUserInfoPage(emptyFilter, this.state.pageNum, this.state.pageSize);
  };

  showCreateUserModal = () => {
    this.setState({ createUserModalVisible: true });
  };

  createUserModalClosed = () => {
    this.setState({ createUserModalVisible: false });
    this.fetchUserInfoPage(this.props.userFilter, this.state.pageNum, this.state.pageSize);
  };

  hanleDeleteUser = (user: UserInfoDto) => {
    const that = this;
    confirm({
      title: "删除用户",
      content: `你确定要删除用户："${user.userName}" ？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {
        that.deleteUser(user.id);
      },
    });
  };

  fetchUserInfoPage = async (filter: UserFilterDto, pageNum: number, pageSize: number) => {
    try {
      this.setState({ loading: true });
      const response = await userHttpService.getUserInfosByFilter(filter, pageNum, pageSize);
      this.setState({
        userInfoPage: response.data,
      });
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

  deleteUser = async (userId: number) => {
    try {
      this.setState({ loading: true });
      await userHttpService.deleteUser(userId);
      this.fetchUserInfoPage(this.props.userFilter, this.state.pageNum, this.state.pageSize);
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
}
