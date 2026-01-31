import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
    <div className="logo">
      <i className="fas fa-robot"></i> Recruit.ai
    </div>
    <div className="nav-links">
      <a href="#features" className="nav-link">Features</a>
      <a href="#stats" className="nav-link">Impact</a>
      <a href="/login" className="nav-btn login">Login</a>
      <a href="/register" className="nav-btn signup">Get Started</a>
    </div>
  </nav>
  );
}
