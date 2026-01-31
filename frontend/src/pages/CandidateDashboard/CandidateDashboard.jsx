// import { useState } from "react";
// import CandidateDashboardHeader from "../../components/candidate/CandidateDashboardHeader/CandidateDashboardHeader";
// import JobOpeningCard from "../../components/candidate/JobOpeningCard/JobOpeningCard";
// import AppliedJobCard from "../../components/candidate/AppliedJobCard/AppliedJobCard";
// import ResumeUploadCard from "../../components/candidate/ResumeUploadCard/ResumeUploadCard";
// import "./CandidateDashboard.css";

// export default function CandidateDashboard() {
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [showResumeUpload, setShowResumeUpload] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   // Mock data for job openings
//   const jobOpenings = [
//     {
//       id: 1,
//       title: "Software Engineer",
//       company: "Tech Innovations Inc.",
//       location: "San Francisco, CA",
//       type: "Full-time",
//       salary: "$120k - $180k",
//       description:
//         "We are looking for an experienced Software Engineer to join our dynamic team. You will be responsible for developing high-quality software solutions and collaborating with cross-functional teams.",
//       requirements: [
//         "Bachelor's degree in Computer Science or related field",
//         "3+ years of experience in software development",
//         "Proficiency in JavaScript, Python, or Java",
//         "Experience with cloud platforms (AWS, Azure, or GCP)",
//       ],
//       postedDate: "2 days ago",
//     },
//     {
//       id: 2,
//       title: "Frontend Developer",
//       company: "Digital Solutions Ltd.",
//       location: "New York, NY",
//       type: "Full-time",
//       salary: "$100k - $150k",
//       description:
//         "Join our frontend team to build beautiful and responsive user interfaces. We're looking for someone passionate about creating exceptional user experiences.",
//       requirements: [
//         "Strong knowledge of React, Vue, or Angular",
//         "Experience with CSS preprocessors (SASS, LESS)",
//         "Understanding of responsive design principles",
//         "Portfolio demonstrating frontend projects",
//       ],
//       postedDate: "5 days ago",
//     },
//     {
//       id: 3,
//       title: "Backend Developer",
//       company: "Cloud Systems Corp.",
//       location: "Remote",
//       type: "Full-time",
//       salary: "$110k - $170k",
//       description:
//         "We need a skilled Backend Developer to design and implement scalable server-side applications. You'll work with modern technologies and microservices architecture.",
//       requirements: [
//         "Experience with Node.js, Python, or Go",
//         "Knowledge of database systems (PostgreSQL, MongoDB)",
//         "Understanding of RESTful APIs and GraphQL",
//         "Experience with Docker and Kubernetes",
//       ],
//       postedDate: "1 week ago",
//     },
//     {
//       id: 4,
//       title: "Full Stack Developer",
//       company: "StartupHub",
//       location: "Austin, TX",
//       type: "Full-time",
//       salary: "$115k - $165k",
//       description:
//         "Looking for a versatile Full Stack Developer who can work on both frontend and backend. You'll be involved in the entire development lifecycle.",
//       requirements: [
//         "Proficiency in both frontend and backend technologies",
//         "Experience with React and Node.js",
//         "Knowledge of database design and optimization",
//         "Strong problem-solving skills",
//       ],
//       postedDate: "3 days ago",
//     },
//     {
//       id: 5,
//       title: "DevOps Engineer",
//       company: "Infrastructure Pro",
//       location: "Seattle, WA",
//       type: "Full-time",
//       salary: "$130k - $190k",
//       description:
//         "Join our DevOps team to automate and optimize our infrastructure. You'll help build and maintain our CI/CD pipelines and cloud infrastructure.",
//       requirements: [
//         "Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
//         "Knowledge of cloud platforms (AWS, Azure, GCP)",
//         "Proficiency in infrastructure as code (Terraform, CloudFormation)",
//         "Understanding of containerization (Docker, Kubernetes)",
//       ],
//       postedDate: "4 days ago",
//     },
//   ];

//   // Mock data for applied jobs
//   const appliedJobs = [
//     {
//       id: 1,
//       jobTitle: "Senior Software Engineer",
//       company: "Tech Corp",
//       location: "San Francisco, CA",
//       type: "Full-time",
//       appliedDate: "2 weeks ago",
//       status: "Reviewed",
//     },
//     {
//       id: 2,
//       jobTitle: "React Developer",
//       company: "Web Solutions",
//       location: "Remote",
//       type: "Full-time",
//       appliedDate: "1 week ago",
//       status: "Interview",
//     },
//     {
//       id: 3,
//       jobTitle: "Python Developer",
//       company: "Data Analytics Inc.",
//       location: "Boston, MA",
//       type: "Full-time",
//       appliedDate: "3 weeks ago",
//       status: "Pending",
//     },
//   ];

//   const handleApply = (jobId) => {
//     const job = jobOpenings.find((j) => j.id === jobId);
//     setSelectedJob(job);
//     setSelectedJobId(jobId);
//     setShowResumeUpload(true);
//   };

//   const handleResumeUploaded = (file) => {
//     // Resume uploaded successfully, the ResumeUploadCard will show "Start Interview" button
//     console.log("Resume uploaded:", file);
//   };

//   const handleCloseResumeUpload = () => {
//     setShowResumeUpload(false);
//     setSelectedJob(null);
//     setSelectedJobId(null);
//   };

//   const handleLogout = () => {
//     // Handle logout logic here
//     if (window.confirm("Are you sure you want to logout?")) {
//       // In a real app, you would clear auth state and redirect
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <div className="candidate-dashboard">
//       <CandidateDashboardHeader
//         candidateName="John Doe"
//         onLogout={handleLogout}
//       />
//       {showResumeUpload && selectedJob && (
//         <ResumeUploadCard
//           jobTitle={selectedJob.title}
//           company={selectedJob.company}
//           onResumeUploaded={handleResumeUploaded}
//           onClose={handleCloseResumeUpload}
//         />
//       )}
//       <div className="dashboard-container">
//         <section id="job-openings" className="dashboard-section">
//           <div className="section-header">
//             <h2>
//               <i className="fas fa-briefcase"></i> Available Job Openings
//             </h2>
//             <p className="section-subtitle">
//               Explore exciting opportunities and find your next career move
//             </p>
//           </div>
//           <div className="job-openings-grid">
//             {jobOpenings.map((job) => (
//               <JobOpeningCard key={job.id} job={job} onApply={handleApply} />
//             ))}
//           </div>
//         </section>

//         <section id="applied-jobs" className="dashboard-section">
//           <div className="section-header">
//             <h2>
//               <i className="fas fa-file-alt"></i> My Applications
//             </h2>
//             <p className="section-subtitle">
//               Track the status of your job applications
//             </p>
//           </div>
//           {appliedJobs.length > 0 ? (
//             <div className="applied-jobs-grid">
//               {appliedJobs.map((application) => (
//                 <AppliedJobCard key={application.id} application={application} />
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <i className="fas fa-inbox"></i>
//               <p>You haven't applied to any jobs yet.</p>
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../config";
import CandidateDashboardHeader from "../../components/candidate/CandidateDashboardHeader/CandidateDashboardHeader";
import JobOpeningCard from "../../components/candidate/JobOpeningCard/JobOpeningCard";
import AppliedJobCard from "../../components/candidate/AppliedJobCard/AppliedJobCard";
import ResumeUploadCard from "../../components/candidate/ResumeUploadCard/ResumeUploadCard";
import "./CandidateDashboard.css";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [jobOpenings, setJobOpenings] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [candidateProfile, setCandidateProfile] = useState(null);

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. FETCH DATA
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/candidates/dashboard");
        // Using flattened structure
        const { availableJobs, applications, candidate } = response.data;

        setJobOpenings(availableJobs);
        setAppliedJobs(applications);
        setCandidateProfile(candidate);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // 2. OPEN MODAL (Logic Fixed)
  const handleApply = (jobId) => {
    // A. Check if already applied locally first to save a click
    const alreadyApplied = appliedJobs.find(
      (app) => app.job && app.job._id === jobId
    );
    if (alreadyApplied) {
      alert("You have already applied to this job.");
      return;
    }

    // B. Find job details for the modal
    const job = jobOpenings.find((j) => j._id === jobId);

    // C. Open Modal
    setSelectedJob(job);
    setSelectedJobId(jobId);
    setShowResumeUpload(true);
  };

  // 3. SUBMIT APPLICATION (Logic Fixed)
  // Inside CandidateDashboard.jsx

  const handleResumeUploaded = async (fileObject) => {
    try {
      setLoading(true);

      if (!selectedJobId) {
        alert("No job selected. Please try again.");
        return;
      }

      if (!fileObject) {
        alert("Please select a resume file.");
        return;
      }

      const formData = new FormData();
      formData.append("jobId", selectedJobId);
      formData.append("resume", fileObject);

      // Axios will automatically set Content-Type with boundary for FormData
      // Don't set Content-Type manually - let axios handle it
      const res = await API.post("/candidates/apply", formData);

      // ... rest of logic
      const newApplication = res.data.application;
      setAppliedJobs([newApplication, ...appliedJobs]);
      handleCloseResumeUpload();
      
      // Navigate to interview screen after successful application
      navigate(`/interview?applicationId=${newApplication._id}&jobId=${selectedJobId}`);
    } catch (err) {
      console.error("Upload failed", err);
      // Log the full backend error to help debug if it fails again
      console.log("Backend Error:", err.response?.data);
      console.log("Error Status:", err.response?.status);
      console.log("Error Details:", err.response);
      
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        "Failed to submit application";
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResumeUpload = () => {
    setShowResumeUpload(false);
    setSelectedJob(null);
    setSelectedJobId(null);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="candidate-dashboard">
      <CandidateDashboardHeader
        candidateName={candidateProfile?.name || "Candidate"}
        onLogout={handleLogout}
      />

      {showResumeUpload && selectedJob && (
        <ResumeUploadCard
          jobTitle={selectedJob.title}
          company={selectedJob.company}
          onResumeUploaded={handleResumeUploaded}
          onClose={handleCloseResumeUpload}
        />
      )}

      <div className="dashboard-container">
        <section id="job-openings" className="dashboard-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-briefcase"></i> Available Job Openings
            </h2>
          </div>
          <div className="job-openings-grid">
            {jobOpenings.map((job) => (
              <JobOpeningCard
                key={job._id}
                job={job}
                onApply={() => handleApply(job._id)}
              />
            ))}
          </div>
        </section>

        <section id="applied-jobs" className="dashboard-section">
          <div className="section-header">
            <h2>
              <i className="fas fa-file-alt"></i> My Applications
            </h2>
          </div>
          {appliedJobs.length > 0 ? (
            <div className="applied-jobs-grid">
              {appliedJobs.map((application) => {
                // 👇 ADD THIS GUARD CLAUSE
                if (!application) return null;

                return (
                  <AppliedJobCard
                    key={application._id} // Keep using _id (MongoDB standard)
                    application={application}
                  />
                );
              })}
            </div>
          ) : (
            <div className="empty-state">No applications found</div>
          )}
        </section>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import API from "../../config"; // Import the axios instance we created above
// import CandidateDashboardHeader from "../../components/candidate/CandidateDashboardHeader/CandidateDashboardHeader";
// import JobOpeningCard from "../../components/candidate/JobOpeningCard/JobOpeningCard";
// import AppliedJobCard from "../../components/candidate/AppliedJobCard/AppliedJobCard";
// import ResumeUploadCard from "../../components/candidate/ResumeUploadCard/ResumeUploadCard";
// import "./CandidateDashboard.css";

// export default function CandidateDashboard() {
//   // 1. STATE MANAGEMENT
//   const [jobOpenings, setJobOpenings] = useState([]); // Replaces mock data
//   const [appliedJobs, setAppliedJobs] = useState([]); // Replaces mock data
//   const [candidateProfile, setCandidateProfile] = useState(null);

//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [showResumeUpload, setShowResumeUpload] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 2. FETCH DATA (Maps to: exports.getDashboard)
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Calls GET /api/candidates/dashboard
//         const response = await API.get("/candidates/dashboard");

//         // Map backend response structure to frontend state
//         const { availableJobs, applications, candidate } = response.data;

//         setJobOpenings(availableJobs);
//         setAppliedJobs(applications);
//         setCandidateProfile(candidate);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching dashboard:", err);
//         setError("Failed to load dashboard data");
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   // 3. APPLY LOGIC (Maps to: exports.applyForJob)
//   const handleApply = async (jobId) => {
//     // Optimistic UI update or wait for API
//     const job = jobOpenings.find((j) => j._id === jobId); // Note: MongoDB uses _id, not id
//     setSelectedJob(job);
//     setSelectedJobId(jobId);

//     // We open the resume upload modal first, actual application happens after upload
//     // OR if you want to apply immediately without resume:
//     try {
//       await API.post("/candidates/apply", { jobId });
//       // Refresh data or update local state to show 'Pending'
//       setShowResumeUpload(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error applying for job");
//     }
//   };

//   // 4. UPLOAD LOGIC (Maps to: exports.uploadResume)
//   const handleResumeUploaded = async (fileUrl) => {
//     try {
//       // const finalResumeUrl =
//       //   fileUrl ||
//       //   "https://writing.colostate.edu/guides/documents/resume/functionalsample.pdf";
//       // Calls POST /api/candidates/upload-resume
//       await API.post("/candidates/upload-resume", {
//         jobId: selectedJobId,
//         resumeUrl: fileUrl, // Assuming your file uploader returns a URL string
//       });

//       console.log("Resume uploaded for job:", selectedJobId);

//       // Refresh the list to show the new application status
//       const res = await API.get("/candidates/applications");
//       setAppliedJobs(res.data.data);

//       handleCloseResumeUpload();
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert("Failed to link resume to application");
//     }
//   };

//   const handleCloseResumeUpload = () => {
//     setShowResumeUpload(false);
//     setSelectedJob(null);
//     setSelectedJobId(null);
//   };

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("token"); // Clear auth token
//       window.location.href = "/login";
//     }
//   };

//   if (loading)
//     return <div className="loading-spinner">Loading Dashboard...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="candidate-dashboard">
//       <CandidateDashboardHeader
//         candidateName={candidateProfile?.name || "Candidate"}
//         onLogout={handleLogout}
//       />
//       {showResumeUpload && selectedJob && (
//         <ResumeUploadCard
//           jobTitle={selectedJob.title}
//           company={selectedJob.company || "Company Name"} // Adjust based on your Job Model
//           onResumeUploaded={handleResumeUploaded}
//           onClose={handleCloseResumeUpload}
//         />
//       )}

//       {/* Rest of your JSX remains mostly the same, just ensure field names match DB */}
//       <div className="dashboard-container">
//         <section id="job-openings" className="dashboard-section">
//           {/* ... Header ... */}
//           <div className="section-header">
//             <h2>
//               <i className="fas fa-briefcase"></i> Available Job Openings
//             </h2>
//             <p className="section-subtitle">
//               Explore exciting opportunities and find your next career move
//             </p>
//           </div>
//           <div className="job-openings-grid">
//             {jobOpenings.map((job) => (
//               <JobOpeningCard
//                 key={job._id} // MongoDB uses _id
//                 job={job}
//                 onApply={() => handleApply(job._id)}
//               />
//             ))}
//           </div>
//         </section>

//         <section id="applied-jobs" className="dashboard-section">
//           {/* ... Header ... */}

//           <div className="section-header">
//             <h2>
//               <i className="fas fa-file-alt"></i> My Applications
//             </h2>
//             <p className="section-subtitle">
//               Track the status of your job applications
//             </p>
//           </div>
//           {appliedJobs.length > 0 ? (
//             <div className="applied-jobs-grid">
//               {appliedJobs.map((application) => (
//                 <AppliedJobCard
//                   key={application._id}
//                   application={application}
//                 />
//               ))}
//             </div>
//           ) : (
//             // ... Empty state ...
//             <div className="empty-state">No applications found</div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }
