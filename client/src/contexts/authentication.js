import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();

  // register the user
  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/findthatjob");
  };

  return (
    <AuthContext.Provider value={{ register }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
