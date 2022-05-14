import { Routes, Route } from "react-router-dom";
// Components
import Sidebar from "../components/Utilities/SideBar";
import NavBar from "../components/Utilities/Navbar";
// Pages
import LoginPage from "../pages/Authentication/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
import ComponentIndex from "../components/ComponentIndex";
import ViewJob from "../pages/Recruiter/Viewjob";
import UpdateCompanyProfile from "../pages/Recruiter/UpdateCompanyProfile";
import FindJobsPage from "../pages/Professional/FindJobsPage";

export default function UnauthenticatedApp({ userRole }) {
  return (
    <div className="App">
      <NavBar />
      <Sidebar barRole="professional" />{" "}
      {/*สลับ sidebar ไปอีกโหมดให้ใส่ "recruiter" / "professional"*/}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/components" element={<ComponentIndex />} />
        {/*Professional Route Start Here*/}
        <Route path="/findjob" element={<FindJobsPage />} />
        {/*Recruiter Route Start Here*/}
        <Route path="/createjob" element={<CreateJobPage />} />
        <Route path="/viewjob" element={<ViewJob />} />
        <Route
          path="/update-company-profile"
          element={<UpdateCompanyProfile />}
        />
      </Routes>
    </div>
  );
}
