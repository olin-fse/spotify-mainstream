import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import Store from 'store.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from './containers/app/App';
// import Login from 'containers/login/Login';
import NewParty from 'containers/new-party/NewParty';
import Error from 'components/Error';
// import Playlist from 'containers/playlist/Playlist';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={Store()}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/login" component={Login}/> */}
        <Route path="/user/:accessToken/:refreshToken" component={NewParty} />
        <Route path="/error/:errorMsg" component={Error} />
      </div>
    </Router>
  </Provider>,
  rootEl
);

registerServiceWorker();

// <Provider store={store}>
//         <Router history={hashHistory}>
//           <Route path="/" component={App}>
//             <IndexRoute component={Login} />
//             <Route path="/user/:accessToken/:refreshToken" component={User} />
//             <Route path="/error/:errorMsg" component={Error} />
//           </Route>
//         </Router>
// </Provider>