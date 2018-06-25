import * as React from "react";

interface LoadingProps {}

interface LoadingState {}

export class Loading extends React.Component<LoadingProps, LoadingState> {
  public render(): JSX.Element {
    return <div>Loading...</div>;
  }
}
