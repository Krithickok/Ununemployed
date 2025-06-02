import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (localStorage.getItem('isJobSeeker') === 'true') {
          const res = await axios.get('/api/job-seekers/me');
          setProfile(res.data);
        }
      } catch (e) {
        setErrMsg(e.response?.data?.error || e.message);
      }
    };

    const getJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        setJobList(res.data);
      } catch (e) {
        setErrMsg(e.response?.data?.error || e.message);
      }
    };

    getJobs();
    getProfile();
  }, []);

  const applyToJob = async (id) => {
    try {
      if (localStorage.getItem('isJobSeeker') === 'true') {
        await axios.post('/api/applications', {
          jobSeeker: profile._id,
          job: id
        });
        alert('Job applied successfully!');
      }
    } catch (e) {
      setErrMsg(e.response?.data?.error || e.message);
    }
  };

  if (errMsg) return <div>Error: {errMsg}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Job Seeker Dashboard</h2>
      <h3>Your Profile</h3>
      <div>
        <p>Name: {profile.name}</p>
      </div>
      <h3>Available Jobs</h3>
      <ul>
        {jobList.map(job => (
          <li key={job._id}>
            <h4>{job.jobTitle}</h4>
            <p>Skills: {job.skills.join(', ')}</p>
            <button onClick={() => applyToJob(job._id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSeekerDashboard;
