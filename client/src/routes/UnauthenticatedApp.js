import { Routes, Route } from "react-router-dom";
// Components
import Navbar from "../components/UnAuthentication/Navbar";
import Sidebar from "../components/Authentication/SideBar";
// Pages
import LoginPage from "../pages/Authentication/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RegisterRecruiterPage from "../pages/Authentication/RegisterRecruiterPage";
import RegisterProfessionalPage from "../pages/Authentication/RegisterProfessionalPage";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
import ComponentIndex from "../components/ComponentIndex";
export default function UnauthenticatedApp() {
  return (
    <div className="App">
      {/*       <Navbar />
       */}{" "}
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterProfessionalPage />} />
        <Route
          path="/register/professional"
          element={<RegisterProfessionalPage />}
        />
        <Route path="/register/recruiter" element={<RegisterRecruiterPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/components" element={<ComponentIndex />} />
        <Route path="/createjob" element={<CreateJobPage />} />
      </Routes>
    </div>
  );
}
