import * as React from 'react';
import { Button, Layout, Icon } from 'antd';
import { SliderBar } from '../index';

import './app.scss';
import './layout.scss';

const { Header, Footer, Sider, Content } = Layout;

export default class App extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Layout className="fill">
        <Sider width={64}>
          <SliderBar />
        </Sider>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
