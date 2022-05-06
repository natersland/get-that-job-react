// CSS
import "./App.css";

// 🐳🐳🐳🐳 Authen by Nat 🐳🐳🐳🐳
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import GTJhooksfantasy from "./hooks/GTJhooksfantasy";
// 🌈🌈🌈🌈 Homepage by Nikki 🌈🌈🌈🌈
import Navbar from "./components/nav";
import HomePage from "./pages/HomePage";

function App() {
  const { roleBtn, setRoleBtn } = GTJhooksfantasy();
  const auth = useAuth();
  
  return auth.isAuthenticated ? (
    <AuthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />
  ) : (
    <UnauthenticatedApp roleBtn={roleBtn} setRoleBtn={setRoleBtn} />

export default App;
