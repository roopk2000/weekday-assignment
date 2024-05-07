import React, { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({ applyFilters }) => {
  const [minExperience, setMinExperience] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState('');
  const [techStack, setTechStack] = useState('');
  const [role, setRole] = useState('');
  const [minBasePay, setMinBasePay] = useState('');

  useEffect(() => {
    applyFilters({
      minExperience: minExperience.trim(),
      companyName: companyName.trim(),
      location: location.trim(),
      remote: remote.trim(),
      techStack: techStack.trim(),
      role: role.trim(),
      minBasePay: minBasePay.trim()
    });
  }, [minExperience, companyName, location, remote, techStack, role, minBasePay, applyFilters]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="filters">
      <form className='form'>
        
        <label className='label'>
          Company Name:
          <input type="text" value={companyName} onChange={handleInputChange(setCompanyName)} />
        </label>
        <label className='label'>
          Location:
          <input type="text" value={location} onChange={handleInputChange(setLocation)} />
        </label>
        <label className='label'>
          Min Experience:
          <input type="text" value={minExperience} onChange={handleInputChange(setMinExperience)} />
        </label>
        <label className='label'>
          Remote/on-site:
          <input type="text" value={remote} onChange={handleInputChange(setRemote)} />
        </label>
        <label className='label'>
          Tech Stack:
          <input type="text" value={techStack} onChange={handleInputChange(setTechStack)} />
        </label>
        <label className='label'>
          Role:
          <input type="text" value={role} onChange={handleInputChange(setRole)} />
        </label>
        <label className='label'>
          Min Base Pay:
          <input type="text" value={minBasePay} onChange={handleInputChange(setMinBasePay)} />
        </label>
      </form>
    </div>
  );
};

export default Filters;
