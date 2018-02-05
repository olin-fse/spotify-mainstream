import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './containers/app/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import Store from 'store.js';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={Store()}>
      <App />
  </Provider>,
  rootEl
);

registerServiceWorker();
