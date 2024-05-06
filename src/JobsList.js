import React, { useState, useEffect } from 'react';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      const limit = 10;
      const offset = 0;
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit, offset })
      });
      const data = await response.json();
      setJobs(data.jobs);
      setTotalCount(data.totalCount);
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-list">
      {/* Add your jobs list here */}
    </div>
  );
};

export default JobsList;