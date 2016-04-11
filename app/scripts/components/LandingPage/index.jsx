import React from 'react';
import AuthModal from '../Auth/AuthModal.jsx';

let token = window.localStorage.getItem('token');

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
                <div className="col s12 m7">
                  <h1 className="header">DCMan</h1>
                  <h3 className="header">Document Management System</h3>
                  <h5 className="header">Helps you create and manage documents online</h5>
                </div>
              </div>
              <div className="row center">
                  <a className="btn btn-large btn-start"><AuthModal /></a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
