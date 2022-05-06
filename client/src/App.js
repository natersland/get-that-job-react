// CSS
import "./App.css";

// 🐳🐳🐳🐳 Authen by Nat 🐳🐳🐳🐳
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import GTJhooksfantasy from './hooks/GTJHooksFantasy'
// 🌈🌈🌈🌈 Homepage by Nikki 🌈🌈🌈🌈


function App() {
  const { roleBtn, setRoleBtn } = GTJhooksfantasy();
  const auth = useAuth();
  
  return auth.isAuthenticated ? (
    <AuthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  ) : (
    <UnauthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  )}
export default App;
