import { Routes, Route } from "react-router-dom";

import NotFoundPage from "./NotFoundPage";
import ProfessionalHomepage from "./ProfessionalHomepage";
import RecuiterHomepage from "./RecuiterHomepage";
import GTJHooksFantasy from "../hooks/GTJHooksFantasy";
import "../App.css";

export default function AuthenticatedApp() {
  const { roleBtn } = GTJHooksFantasy();
  return (
    <div className="App">
      <Routes>
        {roleBtn === "professional" ? (
          <Route path="/" element={<ProfessionalHomepage />}></Route>
        ) : (
          <Route path="/" element={<RecuiterHomepage />}></Route>
        )}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}
