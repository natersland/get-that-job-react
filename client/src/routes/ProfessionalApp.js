import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import NotFoundPage from "../pages/NotFoundPage";
import FindJobsPage from "../pages/Professional/FindJobsPage";
import SeeMorePage from "../pages/Professional/SeeMorePage";
import UpdatePersonalProfile from "../pages/Professional/UpdateProfile";
import ApplicationsPage from "../pages/Professional/ApplicationsPage";
// Components
import Sidebar from "../components/Navagation/SideBar";

function ProfessionalApp() {
  return (
    <div className="App">
      <Sidebar barRole="professional" />
      <Routes>
        <Route path="*" element={<NotFoundPage />}></Route>
        {/* Professional Route Start Here ------------------------------------ */}
        <Route path="/" element={<FindJobsPage />} />
        <Route path="/findjobs" element={<FindJobsPage />} />
        <Route path="/findjobs/:id" element={<SeeMorePage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/following" element={<NotFoundPage />} />
        <Route path="/profile" element={<UpdatePersonalProfile />} />
        {/* Just for test Route Start Here ------------------------------------ */}
      </Routes>
    </div>
  );
}

export default ProfessionalApp;
