import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
// Contexts
import { useUserData } from "./usersData";
import { useVadilation } from "./vadilation";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const { setEmail, setPassword, role, setRole } = useUserData();
  const { ifInputIsBlank } = useVadilation();
  const navigate = useNavigate();
  // make a login request -------------------------------------------------
  const login = async (data) => {
    ifInputIsBlank();
    const result = await axios.post("http://127.0.0.1:4000/auth/login", data);
    const token = result.data.token;
    localStorage.setItem("token", token);
    const userDataFromToken = jwtDecode(token);
    setState({ ...state, user: userDataFromToken });
    setEmail("");
    setPassword("");
    navigate("/");
  };

  // register the user -------------------------------------------------
  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/");
  };

  // clear the token in localStorage and the user data -------------------------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
