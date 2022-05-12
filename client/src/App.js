// CSS
import "./App.css";

// 🐳 Authentication Login & Register ------------------------
import AuthenticatedApp from "./routes/AuthenticatedApp";
import UnauthenticatedApp from "./routes/UnauthenticatedApp";

// 🌈 Context Fantasy -----------------------------------------
import { useAuth } from "./contexts/authentication";
import { useUserData } from "./contexts/usersData";

function App() {
  const auth = useAuth();
  const { users } = useUserData();

  return auth.isAuthenticated ? (
    <AuthenticatedApp userRole={users} />
  ) : (
    <UnauthenticatedApp userRole={users} />
  );
}

export default App;
