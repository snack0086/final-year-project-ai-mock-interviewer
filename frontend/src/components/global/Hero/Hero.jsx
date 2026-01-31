import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Reinventing the Future of <br />
          Hiring Intelligence
        </h1>
        <p className="subtitle">
          Real-time AI interviewing for smarter recruitment
        </p>
        <p className="description">
          Transform your hiring process with AI-driven interviews, real-time
          candidate analysis, and intelligent recommendations. 
          Join teams
          already speeding up hiring while improving fairness and decision
          quality.
        </p>
        <div className="cta-buttons">
          <a href="/signup" className="cta-btn primary">
            <i className="fas fa-rocket"></i> Start Free Trial
          </a>
          <a href="#features" className="cta-btn secondary">
            <i className="fas fa-play-circle"></i> Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
}
