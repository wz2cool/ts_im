import * as React from 'react';
import { Link } from 'react-router';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default class Profile extends React.Component<any, any> {
  render() {
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={250} style={{ backgroundColor: '#EEEBE9' }}>
          <Link to="/more/profile">Profile</Link>
          <Link to="/more/password">Password</Link>
        </Sider>
        <Content style={{ backgroundColor: '#F0F2F5' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
