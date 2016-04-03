import React from 'react';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="spacer"></div>
        <div id="ui-view" className="container titlehead">
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
