import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OtpVerification(props) {
  const [otpValue, setOtpValue] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const nav = useNavigate();

  async function verifyOtp() {
    setErrMsg('');
    if (!otpValue) {
      setErrMsg('OTP is required.');
      return;
    }
    try {
      const res = await axios.post('/api/verify-otp', {
        mobileNumber: props.mobileNumber,
        otp: otpValue,
      });
      localStorage.setItem('isJobSeeker', props.isJobSeeker);
      if (props.isJobSeeker) {
        nav('/job-seeker-dashboard');
      } else {
        nav('/job-provider-dashboard');
      }
    } catch (e) {
      setErrMsg(e.response?.data?.error || e.message);
    }
  }

  return (
    <div>
      <h2>Enter OTP</h2>
      <input
        value={otpValue}
        onChange={e => setOtpValue(e.target.value)}
        type="text"
        placeholder="Enter Otp"
      />
      <button onClick={verifyOtp}>Continue</button>
      {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
    </div>
  );
}

export default OtpVerification;
