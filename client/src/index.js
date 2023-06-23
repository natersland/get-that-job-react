import App from "./App";
// CSS
import "./App.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import jwtInterceptor from "./utils/jwtInterceptor";
// Contexts ---------------------------------------------
import {APIServiceProvider} from "./service/API_Service"
import { AuthProvider } from "./contexts/authentication";
import { NavigateProvider } from "./contexts/navigate";
import { UserDataProvider } from "./contexts/usersData";
import { JobsDataProvider } from "./contexts/jobsData";
import { VadilationProvider } from "./contexts/vadilation";
import { UtilsProvider } from "./contexts/utilsContext";
// MUI Theme ---------------------------------------------
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/MuiTheme";

jwtInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <APIServiceProvider>
        <UtilsProvider>
          <UserDataProvider>
            <VadilationProvider>
              <AuthProvider>
                <JobsDataProvider>
                  <NavigateProvider>
                    <App />
                  </NavigateProvider>
                </JobsDataProvider>
              </AuthProvider>
            </VadilationProvider>
          </UserDataProvider>
        </UtilsProvider>
        </APIServiceProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
