import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import Store from 'store.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './containers/app/App';
import NewParty from 'containers/new-party/NewParty';
import Error from 'components/Error';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={Store()}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        {/* <Route path="/:accessToken/:refreshToken" component={NewParty} />
        <Route path="/user/:accessToken/:refreshToken" component={NewParty} /> */}
        <Route path="/error/:errorMsg" component={Error} />
      </div>
    </Router>
  </Provider>,
  rootEl
);

registerServiceWorker();
