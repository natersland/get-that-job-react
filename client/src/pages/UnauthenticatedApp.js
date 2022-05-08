import { Routes, Route } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import Navbar from "../components/Navbar";

export default function UnauthenticatedApp(props) {
  const { roleBtn, setRoleBtn } = props;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage roleBtn={roleBtn} setRoleBtn={setRoleBtn} />}
        />
        {/*         <Route path="/register" />
         */}{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
