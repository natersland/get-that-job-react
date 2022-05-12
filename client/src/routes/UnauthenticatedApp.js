import { Routes, Route } from "react-router-dom";
// Components
import Sidebar from "../components/Utilities/SideBar";
import NavBar from "../components/Utilities/Navbar";
// Pages
import LoginPage from "../pages/Authentication/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RegisterRecruiterPage from "../pages/Authentication/RegisterRecruiterPage";
import RegisterProfessionalPage from "../pages/Authentication/RegisterProfessionalPage";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
import ComponentIndex from "../components/ComponentIndex";
<<<<<<< HEAD
<<<<<<< HEAD
import ViewJob from "../pages/Recruiter/Viewjob";
import UpdateCompanyProfile from "../pages/Recruiter/UpdateCompanyProfile";
=======
import FindJobsPage from "../pages/Professional/FindJobsPage";
<<<<<<< HEAD
>>>>>>> df71a56 (design: finished feat design and init files)
export default function UnauthenticatedApp() {
=======
export default function UnauthenticatedApp({ userRole }) {
>>>>>>> d256e2e (feat: finished front-end and components)
=======
import FindJobsPage from "../pages/Professional/FindJobsPage";
export default function UnauthenticatedApp({ userRole }) {
>>>>>>> a4838fbd5232493aec8b25006d26f85b671aadc0
  return (
    <div className="App">
      {/*       <Navbar />
       */}
      <Sidebar barRole="professional" />{" "}
      {/*สลับ sidebar ไปอีกโหมดให้ใส่ "recruiter" / "professional"*/}
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
        {/*Professional Route Start Here*/}
        <Route path="/findjob" element={<FindJobsPage />} />
        {/*Recruiter Route Start Here*/}
>>>>>>> a4838fbd5232493aec8b25006d26f85b671aadc0
        <Route path="/createjob" element={<CreateJobPage />} />
<<<<<<< HEAD
        <Route path="/viewjob" element={<ViewJob />} />
        <Route
          path="/update-company-profile"
          element={<UpdateCompanyProfile />}
        />
=======
        <Route path="/findjob" element={<FindJobsPage />} />
>>>>>>> df71a56 (design: finished feat design and init files)
=======
        {/*Professional Route Start Here*/}
        <Route path="/findjob" element={<FindJobsPage />} />
        {/*Recruiter Route Start Here*/}
        <Route path="/createjob" element={<CreateJobPage />} />
>>>>>>> d256e2e (feat: finished front-end and components)
      </Routes>
    </div>
  );
}
