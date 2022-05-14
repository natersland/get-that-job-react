import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import NotFoundPage from "../pages/NotFoundPage";
import FindJobsPage from "../pages/Professional/FindJobsPage";
import ComponentIndex from "../components/ComponentIndex";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
import UpdateCompanyProfile from "../pages/Recruiter/UpdateCompanyProfile";
import ViewJobs from "../pages/Recruiter/Viewjobs";
// Contexts --------------------------------------------
import { useUserData } from "../contexts/usersData";
// Components
import Sidebar from "../components/Utilities/SideBar";
export default function AuthenticatedApp({ userRole }) {
  const { role } = useUserData();

  return (
    <div className="App">
      {/* Switch Role Zone ------------------------------------ */}
      {role === "professional" ? (
        <Sidebar barRole="professional" />
      ) : (
        <Sidebar barRole="recruiter" />
      )}
      <Routes>
        {role === "professional" ? (
          <Route path="/" element={<FindJobsPage />}></Route>
        ) : (
          <Route path="/" element={<ViewJobs />}></Route>
        )}
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/components" element={<ComponentIndex />} />
        {/* Professional Route Start Here ------------------------------------ */}
        <Route path="/findjobs" element={<FindJobsPage />} />
        {/* Recruiter Route Start Here ------------------------------------ */}
        <Route path="/createjob" element={<CreateJobPage />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
        <Route
          path="/update-company-profile"
          element={<UpdateCompanyProfile />}
        />
        {/**/}
      </Routes>
    </div>
  );
}
