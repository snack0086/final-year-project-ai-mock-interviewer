import { useState } from "react";
import "./CreateJobModal.css";

export default function CreateJobModal({ onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    salaryRange: "",
    description: "",
    requirements: "", // We'll take this as a comma-separated string
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onJobCreated(formData);
    } catch {
      // Parent handles the alert; just reset loading so button is usable again
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Post a New Job</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title*</label>
            <input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. React Developer"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company*</label>
              <input
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Location*</label>
              <input
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>Salary Range</label>
              <input
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="e.g. $100k - $120k"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Requirements (Comma separated)</label>
            <input
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="React, Node.js, 3+ Years Exp"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
