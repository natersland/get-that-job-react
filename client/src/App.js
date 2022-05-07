// CSS
import "./App.css";

// 🐳🐳🐳🐳 Authentication Login & Register 🐳🐳🐳🐳
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";

// 🌈🌈🌈🌈 Hooks Fantasy 🌈🌈🌈🌈
import GTJhooksfantasy from './hooks/GTJHooksFantasy'


function App() {
  const { roleBtn, setRoleBtn } = GTJhooksfantasy();
  const auth = useAuth();
  
  return auth.isAuthenticated ? (
    <AuthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  ) : (
    <UnauthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  )}
export default App;
