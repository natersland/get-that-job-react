import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import NotFoundPage from "../pages/NotFoundPage";
import ComponentIndex from "../components/ComponentIndex";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
import UpdateCompanyProfile from "../pages/Recruiter/UpdateCompanyProfile";
import ViewJobs from "../pages/Recruiter/Viewjobs";
import ViewJobPosting from "../pages/Recruiter/ViewJobPosting";
// Components
import Sidebar from "../components/Navagation/SideBar";

function RecruiterApp() {
  return (
    <div className="App">
      <Sidebar barRole="recruiter" />
      <Routes>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/components" element={<ComponentIndex />} />
        {/* Recruiter Route Start Here ------------------------------------ */}
        <Route path="/" element={<ViewJobs />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
        <Route path="/createjob" element={<CreateJobPage />} />
        <Route path="/profile" element={<UpdateCompanyProfile />} />
        <Route path="/viewJobPosting" element={<ViewJobPosting />} />
        {/* Just for test Route Start Here ------------------------------------ */}
        <Route path="/updateprofile" element={<UpdateCompanyProfile />} />
      </Routes>
    </div>
  );
}

export default RecruiterApp;
