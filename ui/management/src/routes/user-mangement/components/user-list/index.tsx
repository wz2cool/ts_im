import * as React from "react";
import { UserFilterDto, UserInfoPageDto, UserInfoDto } from "../../../../models/dto";
import { Modal } from "antd";
import * as lodash from "lodash";
import { getView } from "./view";
import { UserHttpService } from "../../../../services";

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
    this.state = {
      createUserModalVisible: false,
      createUserModalClosed: this.createUserModalClosed,
      userInfoPage: new UserInfoPageDto(),
      loading: false,
      pageNum: 1,
      pageSize: 10,
    };
  }

  componentDidMount(): void {
    // this.props.fetchUserInfoPage(this.props.userFilter, this.props.pageNum, this.props.pageSize);
  }

  public render(): JSX.Element {
    return getView(this);
  }

  pageNumChange = (pageNum: number) => {
    this.props.pageNumChange(pageNum);
    this.props.fetchUserInfoPage(this.props.userFilter, pageNum, this.props.pageSize);
  };

  pageSizeChange = (pageNum: number, pageSize: number) => {
    this.props.pageNumChange(pageNum);
    this.props.pageSizeChange(pageSize);
    this.props.fetchUserInfoPage(this.props.userFilter, pageNum, pageSize);
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
    this.props.pageNumChange(newPageNum);
    this.props.fetchUserInfoPage(this.props.userFilter, newPageNum, this.props.pageSize);
  };

  clearFilter = () => {
    const emptyFilter = new UserFilterDto();
    this.props.searchFieldChange(emptyFilter);
    this.props.fetchUserInfoPage(emptyFilter, this.props.pageNum, this.props.pageSize);
  };

  showCreateUserModal = () => {
    this.setState({ createUserModalVisible: true });
  };

  createUserModalClosed = () => {
    this.setState({ createUserModalVisible: false });
    // force refresh.
    const newFilter = lodash.assign({}, this.props.userFilter);
    this.props.fetchUserInfoPage(newFilter, this.props.pageNum, this.props.pageSize);
  };

  fetchUserInfoPage = (filter: UserFilterDto, pageNum: number, pageSize: number) => {};

  hanleDeleteUser = (user: UserInfoDto) => {
    confirm({
      title: "删除用户",
      content: `你确定要删除用户："${user.userName}" ？`,
      okText: "确认",
      cancelText: "取消",
      onOk() {},
    });
  };
}
