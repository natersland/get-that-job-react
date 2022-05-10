import { Routes, Route } from "react-router-dom";
// Components
import Navbar from "../components/UnAuthentication/Navbar";
import SideBar from "../components/SideBar";
// Pages
import LoginPage from "./Authentication/LoginPage";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import RegisterRecruiterPage from "./Authentication/RegisterRecruiterPage";
import RegisterProfessionalPage from "./Authentication/RegisterProfessionalPage";
import CreateJobPage from "./Recruiter/CreateJobPage";
export default function UnauthenticatedApp() {
  return (
    <div className="App">
      {/*       <Navbar />
       */}{" "}
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterProfessionalPage />} />
        <Route
          path="/register/professional"
          element={<RegisterProfessionalPage />}
        />
        <Route path="/register/recruiter" element={<RegisterRecruiterPage />} />
        <Route path="/createjob" element={<CreateJobPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
