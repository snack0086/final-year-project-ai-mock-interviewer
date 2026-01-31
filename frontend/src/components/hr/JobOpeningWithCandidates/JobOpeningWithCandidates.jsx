import "./JobOpeningWithCandidates.css";
import CandidateEvaluationCard from "../CandidateEvaluationCard/CandidateEvaluationCard";

export default function JobOpeningWithCandidates({
  jobOpening,
  candidates,
  onViewCandidate,
}) {
  // Sort candidates by rating in ascending order
  const sortedCandidates = [...candidates].sort((a, b) => a.rating - b.rating);

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









