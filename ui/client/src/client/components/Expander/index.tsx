import * as React from 'react';
import { Layout } from 'antd';

import './style.scss';

const { Header, Footer, Sider, Content } = Layout;

interface ExpanderProps {
  header: React.ReactNode;
  isOpen?: boolean;
  expanded?: () => void;
  collapsed?: () => void;
}

interface ExpanderState {
  isOpen: boolean;
}

export class Expander extends React.Component<ExpanderProps, ExpanderState> {
  constructor(props: ExpanderProps) {
    super(props);
    this.state = { isOpen: this.props.isOpen || false };
  }
  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidUpdate(prevProps: ExpanderProps, prevState: ExpanderState) {
    if (prevState.isOpen !== this.state.isOpen) {
      if (this.state.isOpen) {
        if (this.props.expanded) {
          this.props.expanded();
        }
      } else {
        if (this.props.collapsed) {
          this.props.collapsed();
        }
      }
    }
  }

  public render(): JSX.Element {
    return (
      <div className="expander">
        <div className="header" onClick={() => this.handleClick()}>
          <i className={'arrow ' + (this.state.isOpen ? 'expanded' : '')} />
          {this.props.header}
        </div>
        <div className={'content ' + (this.state.isOpen ? 'show' : 'hidden')}>{this.props.children}</div>
      </div>
    );
  }
}