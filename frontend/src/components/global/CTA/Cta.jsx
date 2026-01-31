import "./Cta.css";

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Transform Your Hiring Process?</h2>
        <p>
          Join thousands of teams already using Recruit.ai to speed up hiring,
          improve candidate evaluation, and make smarter talent decisions.
        </p>
        <div className="cta-buttons">
          <a href="/signup" className="cta-btn primary">
            <i className="fas fa-user-plus"></i> Create Free Account
          </a>
          <a href="/login" className="cta-btn primary">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </a>
        </div>
      </div>
    </section>
  );
}
