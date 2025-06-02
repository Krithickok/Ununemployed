import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [role, setRole] = useState(null);
  const [mob, setMob] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [otpVisible, setOtpVisible] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const nav = useNavigate();

  const selectRole = (type) => {
    setRole(type === 'seeker');
    nav('/otp');
  };

  const requestOtp = async () => {
    setErrMsg('');
    if (!mob) {
      setErrMsg('Mobile number is required.');
      return;
    }
    try {
      const res = await axios.post('/api/send-otp', { mobileNumber: mob });
      setOtpVisible(true);
    } catch (e) {
      setErrMsg(e.response?.data?.error || e.message);
    }
  };

  const verifyOtp = async () => {
    setErrMsg('');
    if (!otpVal) {
      setErrMsg('OTP is required.');
      return;
    }
    try {
      const res = await axios.post('/api/verify-otp', { mobileNumber: mob, otp: otpVal });
      localStorage.setItem('isJobSeeker', role);
      if (role) {
        nav('/job-seeker-dashboard');
      } else {
        nav('/job-provider-dashboard');
      }
    } catch (e) {
      setErrMsg(e.response?.data?.error || e.message);
    }
  };

  return (
    <div>
      {otpVisible ? (
        <div>
          <h2>Enter Mobile & OTP</h2>
          <input
            value={mob}
            onChange={e => setMob(e.target.value)}
            placeholder="Enter Mob"
            type="text"
          />
          <button onClick={requestOtp}>Get Otp</button>
          <input
            value={otpVal}
            onChange={e => setOtpVal(e.target.value)}
            placeholder="Enter Otp"
            type="text"
          />
          <button onClick={verifyOtp}>Continue</button>
          {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
        </div>
      ) : (
        <div>
          <h2>JOB Connector</h2>
          <button onClick={() => selectRole('seeker')}>JOB SEEKer</button>
          <button onClick={() => selectRole('provider')}>JOB Provider</button>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
