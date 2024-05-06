import React, { useState, useEffect } from 'react';
import "./JobsList.css";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        "limit": 10,
        "offset": 0
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setJobs(data.jdList);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-list">
      {jobs && jobs.length > 0 && (
        <div className='job-cards'>
          {jobs.map((job) => (
            <li key={job.jdUid}>
              <div className="job-card">
                <div className="company-info">
                  <div className="company-logo">
                    <img src={job.logoUrl} alt={`${job.companyName} Logo`} />
                  </div>
                  <div className="company-details">
                    <h5>{job.companyName}</h5>
                    <p>{job.jobRole}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <div className="job-details">
                  <p>Estimated Salary: {job.maxJdSalary} {job.salaryCurrencyCode} <span className="tick-mark">&#10004;</span></p>
                  <div className="about-role">
                    <p><strong>About Company:</strong></p>
                    <p>{job.jobDetailsFromCompany.slice(0, 1000)}...</p>
                  </div>
                  <a href={job.jdLink} target="_blank" rel="noopener noreferrer">View Job</a>
                  <p><strong>Min Experience:</strong></p>
                  <p> {job.maxExp} years</p>
                  <button className="apply-button">Easy Apply</button>
                  <button className='Referral-button'>Unlock Referral Asks</button>

                </div>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};




export default JobsList;
