import React, { useState, useEffect } from 'react';
import "./JobsList.css";
import Filters from './Filters';

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
        console.log(data.jdList)
        setJobs(data.jdList);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchJobs();
  }, []);

  const applyFilters = (filters) => {
    // Filter the jobs based on the filter criteria
    const filteredJobs = jobs.filter(job => {
      const minExperienceMatch = !filters.minExperience || job.minExperience >= parseInt(filters.minExperience);
      const companyNameMatch = !filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
      const locationMatch = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const remoteMatch = !filters.remote || job.remote.toLowerCase() === filters.remote.toLowerCase();
      const techStackMatch = !filters.techStack || job.techStack.toLowerCase().includes(filters.techStack.toLowerCase());
      const roleMatch = !filters.role || job.role.toLowerCase().includes(filters.role.toLowerCase());
      const minBasePayMatch = !filters.minBasePay || job.minBasePay >= parseInt(filters.minBasePay);
  
      return minExperienceMatch && companyNameMatch && locationMatch && remoteMatch && techStackMatch && roleMatch && minBasePayMatch;
    });
  
    // Update the job list with filtered jobs
    setJobs(filteredJobs);
  };
  
  

  return (
    <div className="jobs-list">
            <Filters applyFilters={applyFilters} /> {/* Render the Filters component */}

      {jobs && jobs.length > 0 && (
        <div className='job-cards'> {/* Wrap list items in a ul element */}
          {jobs.map((job) => (
            <div key={job.jdUid}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};




export default JobsList;
