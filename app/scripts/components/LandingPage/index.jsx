import React from 'react';

export default class Landing extends React.Component {
    constructor() {
      super();
    }

    render() {
      return (
        <div>
          <div className="section section__hero">
            <div className="container">
              <div className="row">
                <div className="col s12 m9">
                  <div className="main-text">
                    <h3 className="header">Make document management online a breeze</h3>
                  </div>
                  <div className="detailed-text">
                    <h5 className="header">With DCMan, creating documents becomes as easy as creating a tweet. You can choose access levels for each document you create </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
