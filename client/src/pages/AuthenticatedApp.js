import { Routes, Route } from "react-router-dom";
// Components --------------------------------------------
import ProfessionalHomepage from "./Authentication/ProfessionalHomepage";
import RegisterRecruiterPage from "./Authentication/RegisterRecruiterPage";
import NotFoundPage from "./NotFoundPage";
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
      </Routes>
    </div>
  );
}
