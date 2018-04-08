import * as React from 'react';
import { Link, LinkProps } from 'react-router';
import { Location, LocationDescriptor } from 'history';

import './style.scss';

type ToLocationFunction = (location: Location) => LocationDescriptor;

export interface FontIconLinkProps {
  fontClass?: String;
  activeFontClass?: String;
  to: LocationDescriptor | ToLocationFunction;
}

export class FontIconLink extends React.Component<FontIconLinkProps, any> {
  render() {
    return (
      <Link className="fontIconLink" to={this.props.to} activeClassName="activeLink">
        <span className={`defaultIcon iconfont ${this.props.fontClass}`} />
        <span className={`activeIcon iconfont ${this.props.activeFontClass}`} />
      </Link>
    );
  }
}
