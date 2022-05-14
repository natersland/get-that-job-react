import { Routes, Route } from "react-router-dom";
// Components
import NavBar from "../components/Utilities/Navbar";
// Pages
import LoginPage from "../pages/Authentication/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import ComponentIndex from "../components/ComponentIndex";

export default function UnauthenticatedApp({ userRole }) {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/components" element={<ComponentIndex />} />
      </Routes>
    </div>
  );
}
