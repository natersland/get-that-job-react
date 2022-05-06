import { useAuth } from "../contexts/authentication";

export default function LoginSuccessful() {
  const { logout } = useAuth();
  return (
    <div className="App">
      <h1>Login Successful!</h1>
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
