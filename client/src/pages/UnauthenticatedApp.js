import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";

export default function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*         <Route path="/register" />
         */}{" "}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
