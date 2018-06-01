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
      <Menu mode="inline" theme="dark" defaultSelectedKeys={['/about']} selectedKeys={[location.pathname]}>
        <Menu.Item>
          <Icon type="user" key="/user" />
          <span>用户管理</span>
        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to="/about">
            <Icon type="team" />
            <span>关于</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(props => <NavMenu {...props} />);
