import "./CandidateEvaluationDetail.css";

export default function CandidateEvaluationDetail({ candidate, onBack }) {
  if (!candidate) return null;

  const {
    name,
    email,
    phone,
    location,
    rating,
    summary,
    interpretation,
    shouldHire,
    transcript,
    appliedDate,
    jobTitle,
  } = candidate;

  const getRatingColor = (rating) => {
    if (rating >= 8) return "#28a745";
    if (rating >= 6) return "#ffc107";
    return "#dc3545";
  };

  const getHireRecommendation = (shouldHire) => {
    if (shouldHire) {
      return {
        class: "hire-recommended",
        icon: "fas fa-check-circle",
        text: "Recommended for Hire",
      };
    }
    return {
      class: "hire-not-recommended",
      icon: "fas fa-times-circle",
      text: "Not Recommended",
    };
  };

  const hireRec = getHireRecommendation(shouldHire);

  return (
    <div className="candidate-evaluation-detail">
      <button className="back-button" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back to Candidates
      </button>

      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="detail-candidate-info">
            <h1>{name}</h1>
            <p className="detail-job-title">{jobTitle}</p>
            <div className="detail-contact">
              <span>
                <i className="fas fa-envelope"></i> {email}
              </span>
              {phone && (
                <span>
                  <i className="fas fa-phone"></i> {phone}
                </span>
              )}
              {location && (
                <span>
                  <i className="fas fa-map-marker-alt"></i> {location}
                </span>
              )}
            </div>
          </div>
          <div className="detail-rating-section">
            <div
              className="detail-rating"
              style={{ color: getRatingColor(rating) }}
            >
              <div className="detail-rating-number">{rating}</div>
              <div className="detail-rating-label">out of 10</div>
            </div>
            <div className={`hire-recommendation ${hireRec.class}`}>
              <i className={hireRec.icon}></i>
              <span>{hireRec.text}</span>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h2>
              <i className="fas fa-file-alt"></i> Interview Summary
            </h2>
            <div className="summary-content">
              <p>{summary}</p>
            </div>
          </div>

          <div className="detail-section">
            <h2>
              <i className="fas fa-lightbulb"></i> AI Interpretation
            </h2>
            <div className="interpretation-content">
              <p>{interpretation}</p>
            </div>
          </div>

          <div className="detail-section">
            <h2>
              <i className="fas fa-scroll"></i> Interview Transcript
            </h2>
            <div className="transcript-content">
              {transcript.map((entry, index) => (
                <div key={index} className="transcript-entry">
                  <div className="transcript-speaker">
                    <strong>{entry.speaker}:</strong>
                  </div>
                  <div className="transcript-text">{entry.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-meta">
            <span>
              <i className="fas fa-calendar"></i> Applied: {appliedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}









