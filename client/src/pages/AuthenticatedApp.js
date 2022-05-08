import { Routes, Route } from "react-router-dom";
import FindThatJobPage from "./FindThatJobPage";
import ProfessionalHomepage from "./ProfessionalHomepage";
import "../App.css";

export default function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProfessionalHomepage />}></Route>
        <Route path="/findthatjob" element={<FindThatJobPage />}></Route>
      </Routes>
    </div>
  );
}
