// import "./AppliedJobCard.css";

// export default function AppliedJobCard({ application }) {
//   const {
//     id,
//     jobTitle,
//     company,
//     appliedDate,
//     status,
//     location,
//     type,
//   } = application;

//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return "status-pending";
//       case "reviewed":
//         return "status-reviewed";
//       case "interview":
//         return "status-interview";
//       case "accepted":
//         return "status-accepted";
//       case "rejected":
//         return "status-rejected";
//       default:
//         return "status-pending";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return "fas fa-clock";
//       case "reviewed":
//         return "fas fa-eye";
//       case "interview":
//         return "fas fa-calendar-check";
//       case "accepted":
//         return "fas fa-check-circle";
//       case "rejected":
//         return "fas fa-times-circle";
//       default:
//         return "fas fa-clock";
//     }
//   };

//   return (
//     <div className="applied-job-card">
//       <div className="applied-job-header">
//         <div className="applied-job-icon">
//           <i className="fas fa-file-alt"></i>
//         </div>
//         <div className="applied-job-info">
//           <h3>{jobTitle}</h3>
//           <p className="applied-company-name">
//             <i className="fas fa-building"></i> {company}
//           </p>
//         </div>
//         <div className={`status-badge ${getStatusClass(status)}`}>
//           <i className={getStatusIcon(status)}></i>
//           {status}
//         </div>
//       </div>

//       <div className="applied-job-details">
//         <div className="applied-job-meta">
//           <span className="applied-meta-item">
//             <i className="fas fa-map-marker-alt"></i> {location}
//           </span>
//           <span className="applied-meta-item">
//             <i className="fas fa-clock"></i> {type}
//           </span>
//           <span className="applied-meta-item">
//             <i className="fas fa-calendar"></i> Applied {appliedDate}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }




import "./AppliedJobCard.css";

export default function AppliedJobCard({ application }) {
  // 1. DESTRUCTURE CORRECTLY
  // The job details are inside 'application.job', not at the top level
  // We also use 'createdAt' as the applied date
  const { status, job, createdAt } = application;

  // 2. SAFETY CHECKS (Optional Chaining)
  // If 'job' is null (e.g. job was deleted), we provide fallbacks
  const jobTitle = job?.title || "Unknown Position";
  const companyName = job?.company || "Unknown Company";
  const location = job?.location || "N/A";
  const type = job?.type || "N/A";

  // 3. FORMAT DATE
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "reviewed":
        return "status-reviewed";
      case "interview":
        return "status-interview";
      case "accepted":
        return "status-accepted";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "fas fa-clock";
      case "reviewed":
        return "fas fa-eye";
      case "interview":
        return "fas fa-calendar-check";
      case "accepted":
        return "fas fa-check-circle";
      case "rejected":
        return "fas fa-times-circle";
      default:
        return "fas fa-clock";
    }
  };

  return (
    <div className="applied-job-card">
      <div className="applied-job-header">
        <div className="applied-job-icon">
          <i className="fas fa-file-alt"></i>
        </div>
        <div className="applied-job-info">
          <h3>{jobTitle}</h3>
          <p className="applied-company-name">
            {/* Map to companyName variable created above */}
            <i className="fas fa-building"></i> {companyName}
          </p>
        </div>
        <div className={`status-badge ${getStatusClass(status)}`}>
          <i className={getStatusIcon(status)}></i>
          {status}
        </div>
      </div>

      <div className="applied-job-details">
        <div className="applied-job-meta">
          <span className="applied-meta-item">
            <i className="fas fa-map-marker-alt"></i> {location}
          </span>
          <span className="applied-meta-item">
            <i className="fas fa-clock"></i> {type}
          </span>
          <span className="applied-meta-item">
            {/* Use the formatted date */}
            <i className="fas fa-calendar"></i> Applied {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}




