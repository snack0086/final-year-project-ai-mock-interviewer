import "./JobOpeningWithCandidates.css";
import CandidateEvaluationCard from "../CandidateEvaluationCard/CandidateEvaluationCard";

export default function JobOpeningWithCandidates({
  jobOpening,
  candidates,
  onViewCandidate,
  onDeleteJob,
}) {
  // Sort candidates by rating in ascending order
  const sortedCandidates = [...candidates].sort((a, b) => a.rating - b.rating);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${jobOpening.title}"? This will also remove all applications for this job.`)) {
      onDeleteJob(jobOpening._id || jobOpening.id);
    }
  };

  return (
    <div className="job-opening-with-candidates">
      <div className="job-opening-header">
        <div className="job-icon">
          <i className="fas fa-briefcase"></i>
        </div>
        <div className="job-info">
          <h2>{jobOpening.title}</h2>
          <p className="job-company">
            <i className="fas fa-building"></i> {jobOpening.company}
          </p>
          <div className="job-meta">
            <span>
              <i className="fas fa-map-marker-alt"></i> {jobOpening.location}
            </span>
            <span>
              <i className="fas fa-clock"></i> {jobOpening.type}
            </span>
            <span>
              <i className="fas fa-users"></i> {candidates.length} Candidates
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          title="Delete this job"
          style={{
            marginLeft: "auto",
            background: "rgba(239,68,68,0.15)",
            color: "#ef4444",
            border: "1.5px solid #ef4444",
            borderRadius: "8px",
            padding: "0.5rem 1.1rem",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}
        >
          <i className="fas fa-trash-alt"></i> Delete Job
        </button>
      </div>

      <div className="candidates-section">
        <h3>
          <i className="fas fa-sort-amount-down"></i> Candidates (Sorted by
          Rating - Lowest to Highest)
        </h3>
        {sortedCandidates.length > 0 ? (
          <div className="candidates-list">
            {sortedCandidates.map((candidate) => (
              <CandidateEvaluationCard
                key={candidate.id}
                candidate={candidate}
                onViewDetails={onViewCandidate}
              />
            ))}
          </div>
        ) : (
          <div className="no-candidates">
            <i className="fas fa-inbox"></i>
            <p>No candidates have applied for this position yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}









