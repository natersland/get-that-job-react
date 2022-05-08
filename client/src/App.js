// CSS
import "./App.css";

// 🐳 Authentication Login & Register ------------------------
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";

// 🌈 Context Fantasy -----------------------------------------
import { useAuth } from "./contexts/authentication";
import { useUserData } from "./contexts/usersData";

function App() {
  const { roleBtn, setRoleBtn } = useUserData();
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <AuthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  ) : (
    <UnauthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  );
}
export default App;
