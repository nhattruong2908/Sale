import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Đã có lỗi xảy ra</h1>
          <p style={{ color: '#6b7280', marginBottom: 12 }}>{String(this.state.error?.message || this.state.error)}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', background: '#2563eb', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer' }}
          >
            Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
