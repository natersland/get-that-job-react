import { Routes, Route } from "react-router-dom";
// Components
import Navbar from "../components/UnAuthentication/Navbar";
// Pages
import LoginPage from "./Authentication/LoginPage";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import RegisterRecuiterPage from "./Authentication/RegisterRecuiterPage";
import RegisterProfessionalPage from "./Authentication/RegisterProfessionalPage";

export default function UnauthenticatedApp() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterProfessionalPage />} />
        <Route
          path="/register/professional"
          element={<RegisterProfessionalPage />}
        />
        <Route path="/register/recuiter" element={<RegisterRecuiterPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
