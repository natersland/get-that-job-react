import "./App.css";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import GTJhooksfantasy from "./hooks/GTJhooksfantasy";

function App() {
  const { roleBtn, setRoleBtn } = GTJhooksfantasy();

  const auth = useAuth();
  return auth.isAuthenticated ? (
    <AuthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  ) : (
    <UnauthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  );
}

export default App;
