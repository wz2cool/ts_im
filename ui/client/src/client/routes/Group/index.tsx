import * as React from 'react';
import { Collapse, Layout } from 'antd';
import CardLink from '../../components/CardLink';

const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;

export interface GroupProps {
}

export default class Group extends React.Component<GroupProps, any> {
  render() {
    const imageUrl1 = 'https://avatars3.githubusercontent.com/u/4081993?s=64v=4';
    const imageUrl2 = 'https://avatars3.githubusercontent.com/u/11556152?s=64v=4';
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={250} style={{ backgroundColor: '#EEEBE9' }}>
          <Collapse style={{ backgroundColor: 'transparent', border: 'none' }}>
            <Panel header="高中" key="1">
              <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="高一(1)班" subTitle="32/45" />
              <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="高二/三(1)班" subTitle="39/51" />
            </Panel>
            <Panel header="大学" key="2">
              <CardLink to={`/chat/${2}`} imageUrl={imageUrl2} title="台北大学" subTitle="230/356" />
            </Panel>
          </Collapse>
        </Sider>
        <Content style={{ backgroundColor: '#F0F2F5' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}
