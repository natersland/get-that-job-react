import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
// Contexts
import { useUserData } from "./usersData";
import { useVadilation } from "./vadilation";
import { useUtils } from "./utilsContext";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const navigate = useNavigate();
  const { resetUserData, role, setRole } = useUserData();
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const isProfessional = Boolean(
    localStorage.getItem("role") === "professional"
  );
  const isRecruiter = Boolean(localStorage.getItem("role") === "recruiter");
  const isRightAccount = Boolean(localStorage.getItem("rightAcc"));
  const { ifInputIsBlank, setIsAccountValid } = useVadilation();
  const { setLoading, setIsAlert, setFirstLogIn, setAlertMessage } = useUtils();

  const removeLocalStorageData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("rightAcc");
  };

  // register  ---------------------------------------------------------
  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/");
    setLoading(false);
  };

  // login  ---------------------------------------------------------
  const login = async (data) => {
    ifInputIsBlank();
    const result = await axios.post("http://localhost:4000/auth/login", data);
    const token = result.data.token;
    const userDataFromToken = jwtDecode(token);
    if (!userDataFromToken) {
      setIsAccountValid(true);
    }
    localStorage.setItem("token", token);
    localStorage.setItem("role", userDataFromToken.role);
    localStorage.setItem("id", userDataFromToken.id);
    setState({ ...state, user: userDataFromToken });

    if (userDataFromToken.role === role) {
      localStorage.setItem("rightAcc", true);
      setFirstLogIn(true);
      setAlertMessage(`Login Successful! Welcome ${role}`);
      setIsAlert(true);
      if (userDataFromToken.role === "professional") {
        navigate("/findjobs");
      } else if (userDataFromToken.role === "recruiter") {
        navigate("/viewjobs");
      }
    } else {
      setAlertMessage(`Wrong account type. Please try again.`);
      setIsAlert(true);
      removeLocalStorageData();
      navigate("/login");
    }
    resetUserData();
    setRole("professional");
  };

  // logout ---------------------------------------------------------
  const logout = () => {
    setLoading(true);
    setTimeout(function () {
      removeLocalStorageData();
      setState({ ...state, user: null, error: null });
      navigate("/");
      setLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        isProfessional,
        isRecruiter,
        isRightAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
