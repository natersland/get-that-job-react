// โค้ดนี้อยู่ในไฟล์ client/src/index.js
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/authentication";
import jwtInterceptor from "./utils/jwtInterceptor";

jwtInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
