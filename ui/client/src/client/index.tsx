import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './routes';
import { App } from './containers';
import * as Models from './models';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import initStore from './store';

const store = initStore();

declare var require: {
  (path: string): Models.RequireRoute;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, routeName: string) => void;
};

declare var module: {
  hot: {
    accept: (path: string, change: () => void) => void,
  },
};

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <AppRouter />
    </AppContainer>
  </Provider>,
  document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextAppRouter = require('./routes').default;
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <NextAppRouter />
        </AppContainer>
      </Provider>,
      document.getElementById('root'));
  });
}
