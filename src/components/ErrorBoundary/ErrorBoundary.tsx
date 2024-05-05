import { Component } from 'react';

export default class ErrorBoundary extends Component<any> {
  constructor(props: any) {
    super(props);
    // initialize the error state
    this.state = { hasError: false };
  }

  // if an error happened, set the state to true
  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 在捕获到错误后，更新状态以显示错误信息,
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    // if error happened, return a fallback component
    if ((this.state as { hasError: boolean }).hasError) {
      return this.props.fallback ?? <>Oh no! Epic fail!</>;
    }

    return this.props.children;
  }
}
