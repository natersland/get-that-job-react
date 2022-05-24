import { Routes, Route } from "react-router-dom";
// Components
import Navbar from "../components/Navagation/Navbar";
// Pages
import LoginPage from "../pages/Authentication/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import ComponentIndex from "../components/ComponentIndex";

export default function UnauthenticatedApp() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/components" element={<ComponentIndex />} />
        {/* Just for test Route Start Here ------------------------------------ */}
      </Routes>
    </div>
  );
}
