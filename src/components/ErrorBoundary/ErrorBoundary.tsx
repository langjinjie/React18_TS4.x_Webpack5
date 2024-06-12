import { Component } from 'react';

type IProps = any;

interface IState {
  hasError: boolean;
  count: number;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  // constructor(props: IProps) {
  //   super(props);
  //   // initialize the error state
  //   // this.;
  // }

  state = { hasError: false, count: 0 };

  // 定义默认值
  static defaultProps = {};

  // if an error happened, set the state to true
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // 在捕获到错误后，更新状态以显示错误信息,
    // this.setState({ hasError: true });
  }

  render() {
    // if error happened, return a fallback component
    if ((this.state as { hasError: boolean }).hasError) {
      return this.props.fallback ?? <>Oh no! Epic fail!</>;
    }

    return this.props.children;
  }
}
