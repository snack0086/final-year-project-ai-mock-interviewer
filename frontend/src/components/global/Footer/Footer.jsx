import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div
          className="logo"
          style={{
            color: "white",
            WebkitTextFillColor: "white",
            marginBottom: "20px",
          }}
        >
          <i className="fas fa-robot"></i> Recruit.ai
        </div>
        <div className="footer-links">
          <a href="#features" className="footer-link">
            Features
          </a>
          <a href="#stats" className="footer-link">
            Impact
          </a>
          <a href="/login" className="footer-link">
            Login
          </a>
          <a href="/signup" className="footer-link">
            Sign Up
          </a>
        </div>
        <div className="footer-bottom">
          <p>Recruit.ai © 2025 | Designed for Smarter Hiring 🤖</p>
          <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
            Empowering companies to streamline interviews with intelligent automation
          </p>
        </div>
      </div>
    </footer>
  );
}
