import "./CandidateEvaluationCard.css";

export default function CandidateEvaluationCard({ candidate, onViewDetails }) {
  const { name, email, rating, status, appliedDate } = candidate;

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#28a745";
    if (rating >= 6) return "#ffc107";
    return "#dc3545";
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "status-pending", icon: "fas fa-clock" },
      reviewed: { class: "status-reviewed", icon: "fas fa-eye" },
      interview: { class: "status-interview", icon: "fas fa-calendar-check" },
      accepted: { class: "status-accepted", icon: "fas fa-check-circle" },
      rejected: { class: "status-rejected", icon: "fas fa-times-circle" },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.class}`}>
        <i className={config.icon}></i> {status}
      </span>
    );
  };

  return (
    <div className="candidate-evaluation-card" onClick={() => onViewDetails(candidate)}>
      <div className="candidate-card-header">
        <div className="candidate-avatar">
          <i className="fas fa-user"></i>
        </div>
        <div className="candidate-info">
          <h3>{name}</h3>
          <p className="candidate-email">
            <i className="fas fa-envelope"></i> {email}
          </p>
        </div>
        <div className="rating-display" style={{ color: getRatingColor(rating) }}>
          <div className="rating-number">{rating}/10</div>
          <div className="rating-label">Rating</div>
        </div>
      </div>

      <div className="candidate-card-footer">
        <span className="applied-date">
          <i className="fas fa-calendar"></i> Applied {appliedDate}
        </span>
        {getStatusBadge(status)}
        <button className="view-details-btn">
          <i className="fas fa-eye"></i> View Details
        </button>
      </div>
    </div>
  );
}









