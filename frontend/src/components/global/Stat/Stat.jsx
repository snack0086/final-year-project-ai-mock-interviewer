import "./Stat.css";

export default function Stat() {
  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">30%</div>
            <div className="stat-label">Improved Hiring Efficiency</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Interviews Automated</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">₹50M+</div>
            <div className="stat-label">Recruitment Costs Saved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI-Powered Assessments</div>
          </div>
        </div>
      </div>
    </section>
  );
}
