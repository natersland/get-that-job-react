import { Routes, Route } from "react-router-dom";

import NotFoundPage from "./NotFoundPage";
import ProfessionalHomepage from "./ProfessionalHomepage";
import RecuiterHomepage from "./RecuiterHomepage";
import "../App.css";

export default function AuthenticatedApp(props) {
  const { roleBtn } = props;
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
      </Routes>
    </div>
  );
}
