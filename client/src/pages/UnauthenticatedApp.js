import { BrowRoutes, Route, Routes } from "react-router-dom";
import ProfessionalRegisterPage from "./ProfessionalRegisterPage";

export default function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<ProfessionalRegisterPage />} />
      </Routes>
    </div>
  );
}
