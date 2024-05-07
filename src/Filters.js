import React, { useState } from 'react';
import "./Filters.css"
const Filters = ({ applyFilters }) => {
  const [minExperience, setMinExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState('');
  const [techStack, setTechStack] = useState('');
  const [role, setRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    applyFilters({
      minExperience,
      companyName,
      location,
      remote,
      techStack,
      role,
      minBasePay
    });
  };

  return (
    <div className="filters">
       <form onSubmit={handleFilterSubmit} className='form'>
        <label className='label'>
          Min Experience:
          <input type="text" value={minExperience} onChange={(e) => setMinExperience(e.target.value)} />
        </label>
        <label className='label'>
          Company Name:
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label className='label'>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label className='label'>
          Remote/on-site:
          <input type="text" value={remote} onChange={(e) => setRemote(e.target.value)} />
        </label>
        <label className='label'>
          Tech Stack:
          <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
        </label>
        <label className='label'>
          Role:
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label className='label'>
          Min Base Pay:
          <input type="text" value={minBasePay} onChange={(e) => setMinBasePay(e.target.value)} />
        </label>
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filters;
