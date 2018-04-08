import * as React from 'react';
import { Link } from 'react-router';
import { Layout, Icon, Button } from 'antd';
import { FontIconLink } from '../../components';

import './sliderBar.scss';

const { Header, Footer, Sider, Content } = Layout;

export interface SliderBarProps {
}

export default class SliderBar extends React.Component<SliderBarProps, any> {
  render() {
    return (
      <Layout className="fill silderBar">
        <Content>
          <FontIconLink to="/chat" fontClass="icon-message" activeFontClass="icon-messagefill" />
          <br />
          <FontIconLink to="/friend" fontClass="icon-people" activeFontClass="icon-people_fill" />
          <br />
          <FontIconLink to="/group" fontClass="icon-group" activeFontClass="icon-group_fill" />
        </Content>
      </Layout>
    );
  }
}
