import React, { createContext } from "react";
import axios from "axios";

const APIServiceContext = createContext();

function APIServiceProvider({ children }) {
  const gtjApiService = "https://get-that-job-fantasy.onrender.com";

  // auth
  const login = (data) => {
    return axios.post(`${gtjApiService}/auth/login`, data);
  };

  const register = (data) => {
    return axios.post(`${gtjApiService}/auth/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  // user
  const getUser = (professionalId) => {
    return `${gtjApiService}/users/${professionalId}`
  };

  const getFollowJobs = (professionalId, data) => {
    return axios.patch(
      `${gtjApiService}/users/followjob/${professionalId}`,
      data
    );
  };

  // jobs
  const getJob = (jobId) => {
    return axios.get(
      `${gtjApiService}/jobs/${jobId}`
    );
  };

  const createJob = (data) => {
    return axios.post(`${gtjApiService}/jobs/create`, data);
  };

  // applications
  const fetchApplications = () => {
    return axios.get(`${gtjApiService}/applications`);
  };

  const createApplications = (data) => {
    return axios.post(`${gtjApiService}/applications/create`, data);
  };

  const updateApplicationStatus = (
    applicationId,
    status
  ) => {
    return axios.patch(`${gtjApiService}/applications/${applicationId}`, {
      status,
    });
  };

  const deleteApplication = (applicationId) => {
    return axios.delete(`${gtjApiService}/applications/${applicationId}`);
  };

  const contextValue = {
    gtjApiService,
    login,
    register,
    getUser,
    getFollowJobs,
    getJob,
    createJob,
    fetchApplications,
    createApplications,
    updateApplicationStatus,
    deleteApplication,
  };

  return (
    <APIServiceContext.Provider value={contextValue}>
      {children}
    </APIServiceContext.Provider>
  );
}

export { APIServiceContext, APIServiceProvider };
