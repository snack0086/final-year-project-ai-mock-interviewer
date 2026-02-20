import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}>
          <div style={{
            background: "white",
            borderRadius: 20,
            padding: "3rem 4rem",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            maxWidth: 500,
            width: "90%",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
            <h2 style={{ color: "#333", marginBottom: "0.5rem" }}>Something went wrong</h2>
            <p style={{ color: "#666", marginBottom: "0.5rem" }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre style={{
                background: "#f5f5f5",
                borderRadius: 8,
                padding: "0.8rem",
                fontSize: "0.8rem",
                color: "#e53e3e",
                textAlign: "left",
                overflowX: "auto",
                marginBottom: "1.5rem",
              }}>
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              style={{
                padding: "0.8rem 2rem",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                border: "none",
                color: "white",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}



