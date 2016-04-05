import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect, browserHistory } from 'react-router';
import Landing from './scripts/components/LandingPage/index.jsx';
import Main from './scripts/components/LandingPage/Main.jsx';
import Auth from './scripts/components/Auth/Auth.jsx';
// const Router = ReactRouter.Router;
// const IndexRoute = ReactRouter.IndexRoute;
// const Route = ReactRouter.Route;
// const Redirect = ReactRouter.Redirect;
// const BrowserHistory = ReactRouter.browserHistory;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Main} >
      <IndexRoute component={Landing} />
      <Route path="/auth" component={Auth} >
      </Route>
    </Route>
  </Router>
), document.getElementById('content'));
