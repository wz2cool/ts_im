import * as React from 'react';

export class HoverableComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { text: '' };
  }

  onMouseover = (e: any) => {
    this.setState({ text: 'some text' });
  }

  // clear the text
  onMouseout = (e: any) => {
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <div
        style={{ width: '100px', height: '30px', backgroundColor: 'white' }}
        onMouseEnter={this.onMouseover}
        onMouseLeave={this.onMouseout}
      >
        {text}
      </div>
    );
  }
}
