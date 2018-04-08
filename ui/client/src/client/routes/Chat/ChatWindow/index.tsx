import * as React from 'react';

export default class ChatWindow extends React.Component<any, any> {
  render() {
    return (
      <div style={{ padding: '8px' }}>
        <h3>Chat Window</h3>
        <h5>chat with: user(id={this.props.params.id})</h5>
      </div>
    );
  }
}
