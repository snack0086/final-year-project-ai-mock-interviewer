import "./HRDashboardHeader.css";

export default function HRDashboardHeader({ hrName, onLogout, onPostJob }) {
  return (
    <nav className="hr-dashboard-navbar">
      <div className="hr-dashboard-logo">
        <i className="fas fa-robot"></i> Recruit.ai
      </div>
      <div className="hr-dashboard-nav-links">
        {/* <a href="#job-openings" className="nav-link">
          <i className="fas fa-briefcase"></i> Job Openings
          </a> */}
        <a href="#candidates" className="nav-link">
          <i className="fas fa-users"></i> Candidates
        </a>
        <a className="nav-link" onClick={onPostJob}>
          <i className="fas fa-plus"></i> Post Job
        </a>
        <div className="hr-profile">
          <i className="fas fa-user-tie"></i>
          <span>{hrName || "HR Manager"}</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  );
}





