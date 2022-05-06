import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";

export default function UnauthenticatedApp(props) {
  const { roleBtn, setRoleBtn } = props;

  return (
    <div className="App">
      <Routes>
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
