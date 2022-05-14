import App from "./App";
// CSS
import "./App.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import jwtInterceptor from "./utils/jwtInterceptor";
// Context ---------------------------------------------
import { AuthProvider } from "./contexts/authentication";
import { NavigateProvider } from "./contexts/navigate";
import { UserDataProvider } from "./contexts/usersData";
import { JobsDataProvider } from "./contexts/jobsData";
import { RecruiterProvider } from "./contexts/recruiter";
import { VadilationProvider } from "./contexts/vadilation";

jwtInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDataProvider>
        <VadilationProvider>
          <AuthProvider>
            <RecruiterProvider>
              <JobsDataProvider>
                <NavigateProvider>
                  <App />
                </NavigateProvider>
              </JobsDataProvider>
            </RecruiterProvider>
          </AuthProvider>
        </VadilationProvider>
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
