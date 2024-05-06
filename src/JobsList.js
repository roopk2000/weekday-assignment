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
      <h4>Jobs List</h4>
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
                  <p>Estimated Salary: {job.maxJdSalary} {job.salaryCurrencyCode}</p>
                  <div className="about-role">
                    <p>{job.jobDetailsFromCompany.slice(0, 200)}...</p>
                  </div>
                  <a href={job.jdLink} target="_blank" rel="noopener noreferrer">Show more</a>
                  <p>Min Experience: {job.maxExp} years</p>
                  <button>Easy Apply</button>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
      <p>Total Jobs: {totalCount}</p>
    </div>
  );
};




export default JobsList;
