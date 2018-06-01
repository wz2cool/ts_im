import * as React from 'react';
import { Menu, Icon } from 'antd';

class NavMenu extends React.Component {
  public render(): JSX.Element {
    return (
      <Menu mode="inline" theme="dark">
        <Menu.Item>
          <Icon type="user" />
          <span>用户管理</span>
        </Menu.Item>
        <Menu.Item>
          <Icon type="team" />
          <span>群组管理</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavMenu;
