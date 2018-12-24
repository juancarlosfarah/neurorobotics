import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

// renders app to the dom
const root = document.getElementById('root');
const renderApp = (RootComponent, store, history) => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootComponent />
      </ConnectedRouter>
    </Provider>,
    root,
  );
};

// render app to the dom
const { store, history } = configureStore();

renderApp(App, store, history);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./App').default;
    renderApp(NextRoot, store, history);
  });
}

// this is provided by the create react app scaffolding to make
// the application work better offline. http://bit.ly/CRA-PWA
serviceWorker.unregister();
