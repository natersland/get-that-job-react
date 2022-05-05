import { useAuth } from "../contexts/authentication";
import GTJHooksFantasy from "../hooks/GTJHooksFantasy";

export default function LoginSuccessful() {
  const { roleBtn } = GTJHooksFantasy();
  const { logout } = useAuth();
  return (
    <div className="App">
      <h1>Login Successful! Role: {roleBtn}</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
}
