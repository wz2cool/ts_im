import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from 'antd';
import NavMenu from "../components/NavMenu";
import createRoutes from "../routes";
import createStore from "../store/createStore";

import './style.scss';

const initialState = (window as any).__INITIAL_STATE__;
const store = createStore(initialState);
const routes = createRoutes(store);

const RouteWithSubRoutes = (route: any) => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

interface AppContainerProps {
};

interface AppContainerState {
  collapsed: boolean,
};

export default class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  state: AppContainerState = {
    collapsed: false,
  }

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  public render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Layout className="root_layout">
            <Layout.Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}>
              <div className="logo"></div>
              <NavMenu />
            </Layout.Sider>
            <Layout.Content>
              <div className="content">
                {routes.map((route: any, index: number) => (
                  <RouteWithSubRoutes key={index} {...route} />
                ))}
              </div>
            </Layout.Content>
          </Layout>
        </HashRouter>
      </Provider>
    );
  }
}