import * as React from 'react';
import { Link } from 'react-router';
import { Layout } from 'antd';
import CardLink from '../../components/CardLink';

const { Header, Footer, Sider, Content } = Layout;

export default class Profile extends React.Component<any, any> {
  render() {
    const imageUrl1 = 'https://avatars3.githubusercontent.com/u/4081993?s=64v=4';
    const imageUrl2 = 'https://avatars3.githubusercontent.com/u/11556152?s=64v=4';
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={250} style={{ backgroundColor: '#EEEBE9' }}>
          <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="张三" subTitle="吃饭了吗" />
          <CardLink to={`/chat/${2}`} imageUrl={imageUrl2} title="李四" subTitle="今天不上班" />
        </Sider>
        <Content style={{ backgroundColor: '#F0F2F5' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
