import * as React from 'react';
import { Link, LinkProps } from 'react-router';
import { Location, LocationDescriptor } from 'history';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import './style.scss';

type ToLocationFunction = (location: Location) => LocationDescriptor;

export interface CardLinkProps {
  imageUrl: string;
  title: string;
  subTitle?: string;
  to: LocationDescriptor | ToLocationFunction;
}

const className = 'cardLink';

export default class CardLink extends React.Component<CardLinkProps, any> {
  public static className = className;

  render() {
    const {
            imageUrl,
      title,
      subTitle,
      to,
        } = this.props;

    return (
      <Link className={className} to={to} activeClassName="c-active">
        <Layout style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
          <Sider width={64} style={{ backgroundColor: 'transparent' }}>
            <img className="c-image" src={imageUrl} />
          </Sider>
          <Content style={{ padding: '8px' }}>
            <div className="c-title">{title}</div>
            <div className="c-subTitle">{subTitle}</div>
          </Content>
        </Layout>
      </Link>
    );
  }
}
