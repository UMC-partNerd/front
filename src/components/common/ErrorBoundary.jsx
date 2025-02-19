import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>문제가 발생했습니다.</h1>
          <p>페이지를 새로고침 해주세요.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 