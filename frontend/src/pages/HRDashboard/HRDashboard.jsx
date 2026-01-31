// import { useState } from "react";
// import HRDashboardHeader from "../../components/hr/HRDashboardHeader/HRDashboardHeader";
// import JobOpeningWithCandidates from "../../components/hr/JobOpeningWithCandidates/JobOpeningWithCandidates";
// import CandidateEvaluationDetail from "../../components/hr/CandidateEvaluationDetail/CandidateEvaluationDetail";
// import "./HRDashboard.css";

// export default function HRDashboard() {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   // Mock data for job openings with candidates
//   const jobOpenings = [
//     {
//       id: 1,
//       title: "Software Engineer",
//       company: "Tech Innovations Inc.",
//       location: "San Francisco, CA",
//       type: "Full-time",
//       candidates: [
//         {
//           id: 1,
//           name: "John Doe",
//           email: "john.doe@email.com",
//           phone: "+1 (555) 123-4567",
//           location: "San Francisco, CA",
//           rating: 7.5,
//           status: "Reviewed",
//           appliedDate: "2 weeks ago",
//           jobTitle: "Software Engineer",
//           summary:
//             "John demonstrated strong technical skills during the interview. He showed excellent problem-solving abilities and a good understanding of software engineering principles. His communication was clear and he asked thoughtful questions about the role and company culture.",
//           interpretation:
//             "John is a solid candidate with good technical foundations. While he may need some guidance on advanced topics, his eagerness to learn and positive attitude make him a valuable potential team member. He would benefit from mentorship but shows promise for growth.",
//           shouldHire: true,
//           transcript: [
//             {
//               speaker: "Interviewer",
//               text: "Welcome, John. Thank you for taking the time to interview with us today. Let's start with a brief introduction about yourself.",
//             },
//             {
//               speaker: "John Doe",
//               text: "Thank you for having me. I'm a software engineer with 3 years of experience in full-stack development. I've worked primarily with JavaScript, React, and Node.js, and I'm passionate about building scalable applications.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "That's great. Can you walk me through a challenging project you've worked on recently?",
//             },
//             {
//               speaker: "John Doe",
//               text: "Sure. I recently worked on a microservices architecture project where I had to design and implement a payment processing system. The main challenge was ensuring data consistency across services, which I solved using event-driven architecture.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "Excellent. How do you handle debugging complex issues in production?",
//             },
//             {
//               speaker: "John Doe",
//               text: "I start by gathering as much information as possible from logs and monitoring tools. Then I try to reproduce the issue in a staging environment. I also believe in systematic debugging - breaking down the problem into smaller parts and testing each component.",
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: "Sarah Johnson",
//           email: "sarah.j@email.com",
//           phone: "+1 (555) 234-5678",
//           location: "Oakland, CA",
//           rating: 9.2,
//           status: "Interview",
//           appliedDate: "1 week ago",
//           jobTitle: "Software Engineer",
//           summary:
//             "Sarah is an exceptional candidate with outstanding technical expertise and leadership qualities. She demonstrated deep knowledge of system design, algorithms, and best practices. Her problem-solving approach was methodical and efficient.",
//           interpretation:
//             "Sarah is highly recommended for this position. She possesses the technical skills, experience, and communication abilities that would make her an immediate asset to the team. Her track record and interview performance indicate she can take on challenging projects from day one.",
//           shouldHire: true,
//           transcript: [
//             {
//               speaker: "Interviewer",
//               text: "Hello Sarah, thank you for joining us. Could you start by telling us about your background?",
//             },
//             {
//               speaker: "Sarah Johnson",
//               text: "Hello! I'm a senior software engineer with 7 years of experience. I've worked at several tech companies, focusing on distributed systems and cloud infrastructure. I'm particularly interested in this role because of the technical challenges it presents.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "That's impressive. Can you explain how you would design a system to handle 1 million requests per second?",
//             },
//             {
//               speaker: "Sarah Johnson",
//               text: "I would start by implementing horizontal scaling with load balancers, use caching strategies like Redis for frequently accessed data, implement database sharding, and use CDN for static content. I'd also consider using message queues to handle asynchronous processing and ensure we have proper monitoring and auto-scaling in place.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "Excellent answer. How do you approach code reviews and mentoring junior developers?",
//             },
//             {
//               speaker: "Sarah Johnson",
//               text: "I believe code reviews are learning opportunities. I always provide constructive feedback, explain the reasoning behind suggestions, and encourage questions. For mentoring, I pair program with juniors and help them understand not just the 'how' but the 'why' behind decisions.",
//             },
//           ],
//         },
//         {
//           id: 3,
//           name: "Mike Chen",
//           email: "mike.chen@email.com",
//           phone: "+1 (555) 345-6789",
//           location: "San Jose, CA",
//           rating: 5.8,
//           status: "Pending",
//           appliedDate: "3 days ago",
//           jobTitle: "Software Engineer",
//           summary:
//             "Mike showed enthusiasm for the role but demonstrated gaps in technical knowledge. While he has basic programming skills, he struggled with more complex concepts and system design questions. His communication was adequate but could be improved.",
//           interpretation:
//             "Mike may need significant training and mentorship to be productive in this role. While he shows potential, he would require more time to ramp up compared to other candidates. Consider if the team has capacity for extensive mentoring.",
//           shouldHire: false,
//           transcript: [
//             {
//               speaker: "Interviewer",
//               text: "Hi Mike, thanks for coming in. Let's start with your experience.",
//             },
//             {
//               speaker: "Mike Chen",
//               text: "Hi, I'm a recent computer science graduate. I've done some personal projects and internships, but this would be my first full-time role. I'm really excited about the opportunity.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "That's great. Can you explain what REST APIs are?",
//             },
//             {
//               speaker: "Mike Chen",
//               text: "Um, REST APIs are... they're a way to communicate between different systems. You use HTTP methods like GET and POST to send requests.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "Can you explain the difference between SQL and NoSQL databases?",
//             },
//             {
//               speaker: "Mike Chen",
//               text: "SQL databases are relational, and NoSQL are... not relational? I'm not entirely sure about the specific differences, but I know they store data differently.",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: "Frontend Developer",
//       company: "Digital Solutions Ltd.",
//       location: "New York, NY",
//       type: "Full-time",
//       candidates: [
//         {
//           id: 4,
//           name: "Emily Rodriguez",
//           email: "emily.r@email.com",
//           phone: "+1 (555) 456-7890",
//           location: "Brooklyn, NY",
//           rating: 8.7,
//           status: "Reviewed",
//           appliedDate: "1 week ago",
//           jobTitle: "Frontend Developer",
//           summary:
//             "Emily showcased exceptional frontend development skills with a strong portfolio. She demonstrated expertise in React, modern CSS techniques, and user experience design. Her attention to detail and creative problem-solving were impressive.",
//           interpretation:
//             "Emily is highly recommended. She has the technical skills, design sense, and user-focused mindset that would make her an excellent addition to the frontend team. She can contribute immediately and help elevate the team's work quality.",
//           shouldHire: true,
//           transcript: [
//             {
//               speaker: "Interviewer",
//               text: "Welcome Emily. I've seen your portfolio - it's impressive. Tell me about your approach to building user interfaces.",
//             },
//             {
//               speaker: "Emily Rodriguez",
//               text: "Thank you! I believe in user-centered design. I start by understanding the user's needs, then create prototypes, test with users, and iterate. I'm also passionate about accessibility and performance optimization.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "How do you handle state management in large React applications?",
//             },
//             {
//               speaker: "Emily Rodriguez",
//               text: "I use Redux or Context API depending on the complexity. For simpler apps, Context API works well. For larger apps with complex state, Redux provides better organization and debugging capabilities. I also use custom hooks to encapsulate logic.",
//             },
//           ],
//         },
//         {
//           id: 5,
//           name: "David Kim",
//           email: "david.kim@email.com",
//           phone: "+1 (555) 567-8901",
//           location: "Queens, NY",
//           rating: 6.3,
//           status: "Pending",
//           appliedDate: "4 days ago",
//           jobTitle: "Frontend Developer",
//           summary:
//             "David has basic frontend skills but lacks depth in modern frameworks and best practices. He showed willingness to learn but would need significant training to meet the role requirements.",
//           interpretation:
//             "David may not be ready for this position without extensive training. Consider if there's a junior role available or if the team can invest in his development over several months.",
//           shouldHire: false,
//           transcript: [
//             {
//               speaker: "Interviewer",
//               text: "Hi David, tell me about your frontend experience.",
//             },
//             {
//               speaker: "David Kim",
//               text: "I've been learning HTML, CSS, and JavaScript. I've made a few websites using jQuery and some basic React tutorials. I'm still learning about hooks and state management.",
//             },
//             {
//               speaker: "Interviewer",
//               text: "How would you optimize a slow-loading website?",
//             },
//             {
//               speaker: "David Kim",
//               text: "I would... maybe compress images? And use a CDN? I'm not entirely sure about all the techniques, but I know performance is important.",
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   const handleViewCandidate = (candidate) => {
//     setSelectedCandidate(candidate);
//   };

//   const handleBack = () => {
//     setSelectedCandidate(null);
//   };

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <div className="hr-dashboard">
//       <HRDashboardHeader hrName="Jane Smith" onLogout={handleLogout} />
//       <div className="hr-dashboard-container">
//         {selectedCandidate ? (
//           <CandidateEvaluationDetail
//             candidate={selectedCandidate}
//             onBack={handleBack}
//           />
//         ) : (
//           <section id="job-openings" className="hr-dashboard-section">
//             <div className="section-header">
//               <h2>
//                 <i className="fas fa-briefcase"></i> Job Openings & Candidates
//               </h2>
//               <p className="section-subtitle">
//                 Review candidates and their AI evaluations for each position
//               </p>
//             </div>
//             <div className="job-openings-list">
//               {jobOpenings.map((job) => (
//                 <JobOpeningWithCandidates
//                   key={job.id}
//                   jobOpening={job}
//                   candidates={job.candidates}
//                   onViewCandidate={handleViewCandidate}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import API from "../../config"; // Make sure this path points to your axios config
import CreateJobModal from "../../components/hr/CreateJobModal/CreateJobModal"; // Import this
import HRDashboardHeader from "../../components/hr/HRDashboardHeader/HRDashboardHeader";
import JobOpeningWithCandidates from "../../components/hr/JobOpeningWithCandidates/JobOpeningWithCandidates";
import CandidateEvaluationDetail from "../../components/hr/CandidateEvaluationDetail/CandidateEvaluationDetail";
import "./HRDashboard.css";

export default function HRDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [hrName, setHrName] = useState("HR Manager");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. FETCH: Get data from backend on load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("/hr/dashboard");

        // Map the backend response to state
        // Backend sends: { data: { hrName: "...", jobOpenings: [...] } }
        setJobOpenings(res.data.data.jobOpenings);
        setHrName(res.data.data.hrName);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching HR dashboard:", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCreateJob = async (jobData) => {
    try {
      const res = await API.post("/hr/jobs", jobData);

      // The backend returns the new job object
      const newJob = res.data.job;

      // We need to format it slightly to match the "dashboard" structure
      // (which includes a 'candidates' array)
      const formattedJob = {
        ...newJob,
        id: newJob._id,
        candidates: [], // Start with empty candidates
      };

      // Update state immediately so it appears on screen
      setJobOpenings([formattedJob, ...jobOpenings]);
      setShowCreateJob(false);
      alert("Job Posted Successfully!");
    } catch (err) {
      console.error("Failed to post job", err);
      alert("Failed to post job");
    }
  };

  const handleBack = () => {
    setSelectedCandidate(null);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  if (loading)
    return <div className="loading-spinner">Loading Dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="hr-dashboard">
      <HRDashboardHeader
        hrName={hrName}
        onLogout={handleLogout}
        onPostJob={() => setShowCreateJob(true)}
      />

      {showCreateJob && (
        <CreateJobModal
          onClose={() => setShowCreateJob(false)}
          onJobCreated={handleCreateJob}
        />
      )}

      <div className="hr-dashboard-container">
        {selectedCandidate ? (
          <CandidateEvaluationDetail
            candidate={selectedCandidate}
            onBack={handleBack}
          />
        ) : (
          <section id="job-openings" className="hr-dashboard-section">
            <div className="section-header">
              <h2>
                <i className="fas fa-briefcase"></i> Job Openings & Candidates
              </h2>
              <p className="section-subtitle">
                Review candidates and their AI evaluations for each position
              </p>
            </div>

            {/* <button
              className="post-job-btn"
              onClick={() => setShowCreateJob(true)}
              style={{
                padding: "0.8rem 1.5rem",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              + Post New Job
            </button> */}

            <div className="job-openings-list">
              {jobOpenings.length > 0 ? (
                jobOpenings.map((job) => (
                  <JobOpeningWithCandidates
                    // Backend uses _id, but we mapped it to 'id' in controller
                    key={job.id || job._id}
                    jobOpening={job}
                    // The controller now populates this array:
                    candidates={job.candidates}
                    onViewCandidate={handleViewCandidate}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p>
                    No job openings found. Post a job to start seeing
                    candidates!
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}





