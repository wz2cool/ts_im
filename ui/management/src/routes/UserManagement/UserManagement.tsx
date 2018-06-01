import * as React from "react";
import * as Loadable from "react-loadable";
import { injectReducer } from "../../store/reducers";
import { reducer } from "./modules/UserManagement";

export default (store: any) => {
  // inject reducer
  injectReducer(store, { key: "explore", reducer });

  const LoadableComponent = Loadable({
    loader: () =>
      import(/* webpackChunkName: "explore" */ "./components/UserManagement"),
    loading: () => null,
  });

  class UserManagement extends React.Component {
    public render() {
      return <LoadableComponent />;
    }
  }

  return UserManagement;
};
