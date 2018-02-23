import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import Store from 'store.js';
// import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './containers/app/App';
// import Login from 'containers/login/Login';
// import NewParty from 'containers/new-party/NewParty';
// import Playlist from 'containers/playlist/Playlist';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={Store()}>
    {/* <Router> */}
      <div>
        {/* <Route exact path="/" component={App} /> */}
        {/* <Route path="/login" component={Login} />
        <Route path="/new-party" component={NewParty} />
        <Route path="/playlist" component={Playlist} /> */}
        <App />
      </div>
    {/* </Router> */}
  </Provider>,
  rootEl
);

registerServiceWorker();
