import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobProviderDashboard from './components/JobProviderDashboard';
import ApplicationList from './components/ApplicationList';
import JobList from './components/JobList';
import Profile from './components/Profile';
import OtpVerification from './components/OtpVerification';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import LoginScreen from './components/LoginScreen';

const App = () => (
  <Router>
    <Routes>
      <Route path="/job-provider-dashboard" element={<JobProviderDashboard />} />
      <Route path="/applications" element={<ApplicationList />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
