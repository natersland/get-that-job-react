import React, { createContext, useState, useEffect } from "react";
import ApplicationDataSource from "./DataSource";
import Application from "../../../../models/Application.ts"; // Import the Application model

export const ApplicationsContext = createContext();

export const ApplicationsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filterApplication, setFilterApplication] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const professionalId = localStorage.getItem("id");
      const applicationsData = await ApplicationDataSource.fetchApplications(professionalId);

      // Create Application instances from the response data
      const applicationInstances = applicationsData.map((applicationData) => {
        const application = new Application();
        application.id = applicationData.id;
        application.jobId = applicationData.jobId;
        application.appliedDate = new Date(applicationData.appliedDate);
        application.applicationStatus = applicationData.applicationStatus;

        return application;
      });

      setApplications(applicationInstances);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const changeApplicationStatus = async (applicationId) => {
    try {
      setLoading(true);
      await ApplicationDataSource.updateApplicationStatus(applicationId);
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      setLoading(true);
      await ApplicationDataSource.deleteApplication(applicationId);
      localStorage.removeItem("applicationId");
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        filterApplication,
        loading,
        changeApplicationStatus,
        handleDeleteApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
