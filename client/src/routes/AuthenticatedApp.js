import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import ProfessionalHomepage from "../pages/Authentication/ProfessionalHomepage";
import RegisterRecruiterPage from "../pages/Authentication/RegisterRecruiterPage";
import NotFoundPage from "../pages/NotFoundPage";
// Components
import ComponentIndex from "../components/ComponentIndex";
// Contexts --------------------------------------------
import { useUserData } from "../contexts/usersData";

export default function AuthenticatedApp() {
  const { roleBtn } = useUserData();

  return (
    <div className="App">
      <Routes>
        {roleBtn === "professional" ? (
          <Route path="/" element={<ProfessionalHomepage />}></Route>
        ) : (
          <Route path="/" element={<RegisterRecruiterPage />}></Route>
        )}
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/components" element={<ComponentIndex />} />
      </Routes>
    </div>
  );
}
