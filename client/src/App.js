import "./App.css";
// 🐳 Authentication Login & Register ------------------------
import UnauthenticatedApp from "./routes/UnauthenticatedApp";
import ProfessionalApp from "./routes/ProfessionalApp";
import RecruiterApp from "./routes/RecruiterApp";
// 🌈 Contexts -----------------------------------------
import { useAuth } from "./contexts/authentication";

function App() {
  const auth = useAuth();

  return (
    <>
      {auth.isProfessional && auth.isAuthenticated && auth.isRightAccount && (
        <ProfessionalApp />
      )}
      {auth.isRecruiter && auth.isAuthenticated && auth.isRightAccount && (
        <RecruiterApp />
      )}
      {!auth.isAuthenticated && <UnauthenticatedApp />}
    </>
  );
}

export default App;
