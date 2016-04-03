import React from 'react';

export default class Landing extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div id="hero">
          <div className="container" id="hero-text-container">
            <div className="row">
              <div className="col s12 center-align">
                <h1 id="hero-title" itemProp="description">
                  <span className="bold" >DCMan</span>
                  <span className="thin">
                    is the simplest way for <br />
                  anyone to manage documents online</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                  <a className="btn btn-large create-list-link hero-btn" href="/auth">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
