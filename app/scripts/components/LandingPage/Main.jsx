import React from 'react';
import NavAppBar from './AppBar.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavAppBar />
        <div>
          {this.props.children}
        </div>
        <footer>
          <div className="footer">
            <div className="container">
              <p className="copyright">
                © Edwin Kupara 2016. All rights reserved.
                Yes, all of them.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
