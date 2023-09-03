import { Routes, Route } from "react-router-dom";
// Components --------------------------------------------
import Navbar from "../components/Navigation/Navbar";
// Pages --------------------------------------------
import LoginPage from "../pages/Authentication/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Authentication/RegisterPage";

export default function UnauthenticatedApp() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
        {/* Just for test Route Start Here ------------------------------------ */}
      </Routes>
    </div>
  );
}
