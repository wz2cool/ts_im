import * as React from "react";
import * as Loadable from "react-loadable";
import { injectReducer } from "../../store/reducers";
import { reducer } from "./modules/UserManagement";

export default (store: any) => {
  const LoadableComponent = Loadable({
    loader: () =>
      import(/* webpackChunkName: "userManagement" */ "./containers/user-management.container"),
    loading: () => null,
    render: (loaded, props) => {
      // inject reducer
      injectReducer(store, { key: "userManagement", reducer });

      const Component = loaded.default;
      return <Component {...props} />;
    },
  });

  class UserManagement extends React.Component {
    public render() {
      return <LoadableComponent />;
    }
  }

  return UserManagement;
};
