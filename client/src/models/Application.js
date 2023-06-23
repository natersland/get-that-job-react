class Application {
    constructor(applicationData) {
      this.id = applicationData._id;
      this.jobId = applicationData.jobId;
      this.appliedDate = applicationData.appliedDate;
      this.declinedDate = applicationData.declinedDate;
      this.applicationStatus = applicationData.applicationStatus;
    }
  }