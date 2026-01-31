import "./JobOpeningCard.css";

export default function JobOpeningCard({ job, onApply }) {
  const {
    id,
    title,
    company,
    location,
    type,
    salary,
    description,
    requirements,
    postedDate,
  } = job;

  return (
    <div className="job-opening-card">
      <div className="job-header">
        <div className="job-icon">
          <i className="fas fa-briefcase"></i>
        </div>
        <div className="job-title-section">
          <h3>{title}</h3>
          <p className="company-name">
            <i className="fas fa-building"></i> {company}
          </p>
        </div>
      </div>

      <div className="job-details">
        <div className="job-meta">
          <span className="job-meta-item">
            <i className="fas fa-map-marker-alt"></i> {location}
          </span>
          <span className="job-meta-item">
            <i className="fas fa-clock"></i> {type}
          </span>
          <span className="job-meta-item">
            <i className="fas fa-dollar-sign"></i> {salary}
          </span>
        </div>

        <p className="job-description">{description}</p>

        <div className="job-requirements">
          <h4>Requirements:</h4>
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="job-footer">
          <span className="posted-date">
            <i className="fas fa-calendar"></i> Posted {postedDate}
          </span>
          <button className="apply-btn" onClick={() => onApply(id)}>
            <i className="fas fa-paper-plane"></i> Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}









