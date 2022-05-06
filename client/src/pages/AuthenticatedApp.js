import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
// Components --------------------------------------------
import ProfessionalHomepage from "./Authentication/ProfessionalHomepage";
import RecuiterHomepage from "./Authentication/RecuiterHomepage";
import NotFoundPage from "./NotFoundPage";
// Contexts --------------------------------------------
import { useUserData } from "../contexts/usersData";

export default function AuthenticatedApp() {
  const { roleBtn } = useUserData();

  return (
    <div className="App">
      <Routes>
        {roleBtn === "professional" ? (
          <Route
            path="/"
            element={<ProfessionalHomepage roleBtn={roleBtn} />}
          ></Route>
        ) : (
          <Route
            path="/"
            element={<RecuiterHomepage roleBtn={roleBtn} />}
          ></Route>
        )}
        <Route path="*" element={<NotFoundPage />}></Route>
=======
import FindThatJobPage from "./FindThatJobPage";
import ProfessionalHomepage from "./ProfessionalHomepage";
import GTJhooksfantasy from "../hooks/GTJhooksfantasy";
import "../App.css";

export default function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProfessionalHomepage />}></Route>
        <Route path="/findthatjob" element={<FindThatJobPage />}></Route>
>>>>>>> f6b5c32 (updated professional register ver. 1.1 ka)
      </Routes>
    </div>
  );
}
