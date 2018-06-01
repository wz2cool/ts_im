import * as React from 'react';
import { Menu } from 'antd';

class NavMenu extends React.Component {
  public render(): JSX.Element {
    return (
      <Menu mode="vertical">
        <Menu.SubMenu title="子菜单">
          <Menu>
            <Menu.Item>用户</Menu.Item>
          </Menu>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default NavMenu;
