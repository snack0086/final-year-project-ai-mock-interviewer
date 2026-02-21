import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

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
        maxWidth: 480,
        width: "90%",
      }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🤖</div>
        <h1 style={{ fontSize: "5rem", fontWeight: 800, color: "#667eea", margin: 0, lineHeight: 1 }}>404</h1>
        <h2 style={{ color: "#333", margin: "1rem 0 0.5rem" }}>Page Not Found</h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "0.8rem 1.5rem",
              background: "transparent",
              border: "2px solid #667eea",
              color: "#667eea",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "0.8rem 1.5rem",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
              color: "white",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}








