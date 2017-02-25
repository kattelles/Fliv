import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import Album from './Album';

document.addEventListener("DOMContentLoaded", function() {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={Album}>
        <IndexRoute component={Album}/>
      </Route>
    </Router>,
    root);
});
