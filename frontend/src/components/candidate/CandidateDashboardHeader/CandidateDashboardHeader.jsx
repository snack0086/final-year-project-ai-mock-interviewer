import "./CandidateDashboardHeader.css";

export default function CandidateDashboardHeader({ candidateName, onLogout }) {
  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-logo">
        <i className="fas fa-robot"></i> Recruit.ai
      </div>
      <div className="dashboard-nav-links">
        <a href="#job-openings" className="nav-link">
          <i className="fas fa-briefcase"></i> Job Openings
        </a>
        <a href="#applied-jobs" className="nav-link">
          <i className="fas fa-file-alt"></i> My Applications
        </a>
        <div className="candidate-profile">
          <i className="fas fa-user-circle"></i>
          <span>{candidateName || "Candidate"}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
}









