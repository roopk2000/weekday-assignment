import React from 'react';

const JobPopup = ({ job, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h4>{job.companyName}</h4>
        <p>Job Role: {job.jobRole}</p>
        <p>Location: {job.location}</p>
        <p>Max Experience: {job.maxExp} years</p>
        <p>Max Salary: {job.maxJdSalary} {job.salaryCurrencyCode}</p>
        <p>Job Details: {job.jobDetailsFromCompany}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JobPopup;