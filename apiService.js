import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiService = {
  getJobs: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/jobs`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  getRecruiterProfile: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/job-providers/me`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  sendOtp: async (mobile) => {
    try {
      const res = await axios.post(`${BASE_URL}/send-otp`, { mobileNumber: mobile });
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  getApplications: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/applications`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  updateJobSeekerProfile: async (data) => {
    try {
      const res = await axios.put(`${BASE_URL}/job-seekers/:id`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  verifyOtp: async (mobile, otp) => {
    try {
      const res = await axios.post(`${BASE_URL}/verify-otp`, { mobileNumber: mobile, otp });
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  deleteJob: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/jobs/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  getJobSeekerProfile: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/job-seekers/me`);
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },

  applyForJob: async (seekerId, jobId) => {
    try {
      const res = await axios.post(`${BASE_URL}/applications`, {
        jobSeeker: seekerId,
        job: jobId,
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.error || err.message;
    }
  },
};

export default apiService;
