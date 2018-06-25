import * as React from "react";
import * as Loadable from "react-loadable";
import { injectReducer } from "../../store/reducers";
import { reducer } from "./modules/UserManagement";
import { Loading } from "../../components/loading";

export default (store: any) => {
  const LoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "userManagement" */ "./containers/user-management.container"),
    loading: props => (props.pastDelay ? <Loading /> : null),
    render: (loaded, props) => {
      // inject reducer
      injectReducer(store, { key: "userManagement", reducer });

      const Component = loaded.default;
      return <Component {...props} />;
    },
  });

  class UserManagementLoader extends React.Component {
    public render() {
      return <LoadableComponent />;
    }
  }

  return UserManagementLoader;
};
