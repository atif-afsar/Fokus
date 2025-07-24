import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'white', background: 'black', padding: 32, textAlign: 'center' }}>
          3D view failed to load. Please reload the page.<br />
          <button onClick={() => window.location.reload()} style={{marginTop: 16, padding: '8px 16px'}}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
} 