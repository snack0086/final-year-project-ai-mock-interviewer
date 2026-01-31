import { useState } from "react";
import "./ResumeUploadCard.css";

export default function ResumeUploadCard({
  jobTitle,
  company,
  onResumeUploaded,
  onClose,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF or Word document (.pdf, .doc, .docx)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    // ✅ CRITICAL CHANGE: Pass the File Object to the parent
    // The Parent (Dashboard) will handle the loading state and API call
    onResumeUploaded(selectedFile);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
  };

  return (
    <div className="resume-upload-overlay">
      <div className="resume-upload-card">
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="upload-header">
          <div className="upload-icon">
            <i className="fas fa-file-upload"></i>
          </div>
          <h2>Upload Your Resume</h2>
          <p className="job-info">
            Applying for <strong>{jobTitle}</strong> at{" "}
            <strong>{company}</strong>
          </p>
        </div>

        <div className="upload-area">
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="resume-upload" className="upload-label">
            <div className="upload-content">
              <i className="fas fa-cloud-upload-alt"></i>
              <p className="upload-text">
                {selectedFile ? fileName : "Click to browse or drag and drop"}
              </p>
            </div>
          </label>
        </div>

        <div className="upload-actions">
          <button
            className="upload-btn"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
// import { useState } from "react";
// // import { useNavigate } from "react-router-dom"; // Not needed here for now
// import "./ResumeUploadCard.css";

// export default function ResumeUploadCard({
//   jobTitle,
//   company,
//   onResumeUploaded,
//   onClose,
// }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       const validTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!validTypes.includes(file.type)) {
//         alert("Please upload a PDF or Word document (.pdf, .doc, .docx)");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert("File size should be less than 5MB");
//         return;
//       }
//       setSelectedFile(file);
//       setFileName(file.name);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first");
//       return;
//       onResumeUploaded(selectedFile);
//     }

//     setIsUploading(true);

//     // --- SIMULATE API UPLOAD ---
//     setTimeout(() => {
//       setIsUploading(false);
//       setIsUploaded(true);

//       // ✅ GENERATE MOCK URL HERE
//       // In a real app, this URL comes from AWS S3 response
//       const mockUrl = `https://storage.googleapis.com/resumes/${fileName}`;

//       if (onResumeUploaded) {
//         // Pass the URL, not the file object!
//         onResumeUploaded(selectedFile);
//       }
//     }, 1500);
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setFileName("");
//   };

//   return (
//     <div className="resume-upload-overlay">
//       <div className="resume-upload-card">
//         <button className="close-button" onClick={onClose}>
//           <i className="fas fa-times"></i>
//         </button>

//         <div className="upload-header">
//           <div className="upload-icon">
//             <i className="fas fa-file-upload"></i>
//           </div>
//           <h2>Upload Your Resume</h2>
//           <p className="job-info">
//             Applying for <strong>{jobTitle}</strong> at{" "}
//             <strong>{company}</strong>
//           </p>
//         </div>

//         {/* ... INPUT AREA (Same as your code) ... */}
//         {!isUploaded && (
//           <div className="upload-area">
//             <input
//               type="file"
//               id="resume-upload"
//               accept=".pdf,.doc,.docx"
//               onChange={handleFileChange}
//               className="file-input"
//             />
//             <label htmlFor="resume-upload" className="upload-label">
//               <div className="upload-content">
//                 <i className="fas fa-cloud-upload-alt"></i>
//                 <p className="upload-text">
//                   {selectedFile ? fileName : "Click to browse or drag and drop"}
//                 </p>
//               </div>
//             </label>
//           </div>
//         )}

//         {/* ... ACTIONS ... */}
//         <div className="upload-actions">
//           {!isUploaded ? (
//             <button
//               className="upload-btn"
//               onClick={handleUpload}
//               disabled={!selectedFile || isUploading}
//             >
//               {isUploading ? "Uploading..." : "Submit Application"}
//             </button>
//           ) : (
//             <div className="upload-success">
//               <i
//                 className="fas fa-check-circle"
//                 style={{ color: "green", fontSize: "2rem" }}
//               ></i>
//               <p>Application Sent!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
