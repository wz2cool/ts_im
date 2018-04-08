import * as React from 'react';
import { Router, Route, browserHistory, IndexRoute, RouterState } from 'react-router';
import App from '../../containers/App';
import * as models from '../../models';

declare var require: {
  (path: string): models.RequireRoute;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, routeName: string) => void;
};

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    getComponent: (location: RouterState, cb: any) => {
      require.ensure([], (r: any) => {
        const defaultComponent = require('../Chat').default;
        cb(null, defaultComponent);
      }, 'Chat');
    }
  },
  childRoutes: [
    {
      path: 'chat',
      getComponent: (location: RouterState, cb: any) => {
        require.ensure([], (r: any) => {
          const defaultComponent = require('../Chat').default;
          cb(null, defaultComponent);
        }, 'Chat');
      },
      childRoutes: [
        {
          path: ':id',
          getComponent: (location: RouterState, cb: any) => {
            require.ensure([], (r: any) => {
              const defaultComponent = require('../Chat/ChatWindow').default;
              cb(null, defaultComponent);
            }, 'ChatWindow');
          },
        }
      ]
    },
    {
      path: 'friend',
      getComponent: (location: RouterState, cb: any) => {
        require.ensure([], (r: any) => {
          const defaultComponent = require('../Friend').default;
          cb(null, defaultComponent);
        }, 'Friend');
      }
    },
    {
      path: 'group',
      getComponent: (location: RouterState, cb: any) => {
        require.ensure([], (r: any) => {
          const defaultComponent = require('../Group').default;
          cb(null, defaultComponent);
        }, 'Group');
      }
    },
    {
      path: 'more',
      getComponent: (location: RouterState, cb: any) => {
        require.ensure([], (r: any) => {
          const defaultComponent = require('../More').default;
          cb(null, defaultComponent);
        }, 'More');
      },
      indexRoute: {
        getComponent: (location: RouterState, cb: any) => {
          require.ensure([], (r: any) => {
            const defaultComponent = require('../More/Profile').default;
            cb(null, defaultComponent);
          }, 'Profile');
        }
      },
      childRoutes: [
        {
          path: 'profile',
          getComponent: (location: RouterState, cb: any) => {
            require.ensure([], (r: any) => {
              const defaultComponent = require('../More/Profile').default;
              cb(null, defaultComponent);
            }, 'Profile');
          },
        },
        {
          path: 'password',
          getComponent: (location: RouterState, cb: any) => {
            require.ensure([], (r: any) => {
              const defaultComponent = require('../More/Password').default;
              cb(null, defaultComponent);
            }, 'Password');
          },
        }
      ]
    },
  ]
};

export class AppRouter extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Router key={Math.random()} routes={routes} history={browserHistory} />
    );
  }
}
