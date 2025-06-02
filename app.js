import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JobProviderDashboard from './components/JobProviderDashboard';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import LoginScreen from './components/LoginScreen';
import OtpVerification from './components/OtpVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/job-provider-dashboard" element={<JobProviderDashboard />} />
        <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
