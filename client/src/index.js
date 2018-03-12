import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Store from 'store.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './containers/app/App';
import Error from 'components/Error';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={Store()}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/error/:errorMsg" component={Error} />
      </div>
    </Router>
  </Provider>,
  rootEl
);
