import * as React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from "react-router-dom";

interface NavMenuProps {
  location: any;
};

interface NavMenuState { };

class NavMenu extends React.Component<NavMenuProps, NavMenuState> {
  public render(): JSX.Element {
    const { location } = this.props;
    return (
      <Menu mode="inline" theme="dark" defaultSelectedKeys={['/userManagement']} selectedKeys={[location.pathname]}>
        <Menu.Item key="/userManagement" >
          <NavLink to="/userManagement">
            <Icon type="user" />
            <span>用户管理</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to="/about">
            <Icon type="profile" />
            <span>关于</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(props => <NavMenu {...props} />);
