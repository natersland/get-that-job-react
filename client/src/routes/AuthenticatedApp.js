import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import NotFoundPage from "../pages/NotFoundPage";
import FindJobsPage from "../pages/Professional/FindJobsPage";
import ComponentIndex from "../components/ComponentIndex";
import CreateJobPage from "../pages/Recruiter/CreateJobPage";
// Contexts --------------------------------------------
import { useUserData } from "../contexts/usersData";

export default function AuthenticatedApp({ userRole }) {
  const { role } = useUserData();

  return (
    <div className="App">
      <Routes>
        {role === "professional" ? (
          <Route path="/" element={<FindJobsPage />}></Route>
        ) : (
          <Route path="/" element={<CreateJobPage />}></Route>
        )}

        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/components" element={<ComponentIndex />} />
      </Routes>
    </div>
  );
}
