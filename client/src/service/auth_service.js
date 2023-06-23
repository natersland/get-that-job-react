import React, { useContext, createContext } from "react";
import jwtDecode from "jwt-decode";
import { APIServiceContext } from "../service/API_Service";

const AuthServiceContext = createContext();

const AuthServiceProvider = ({ children }) => {
  const apiService = useContext(APIServiceContext);

  const removeLocalStorageData = () => {
    [
      "token",
      "role",
      "id",
      "rightAcc",
      "language",
      "name",
    ].forEach((key) => localStorage.removeItem(key));
  };

  const addDataToLocalStorage = (token, userDataFromToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userDataFromToken.role);
    localStorage.setItem("id", userDataFromToken.id);
    localStorage.setItem("language", userDataFromToken.language);
    localStorage.setItem("name", userDataFromToken.name);
  };

  const login = async (data) => {
    const result = await apiService.login(data);
    const token = result.data.token;
    const userDataFromToken = jwtDecode(token);
    addDataToLocalStorage(token, userDataFromToken);
    return token;
  };

  const register = async (data) => {
    await apiService.register(data);
  };

  const logout = async () => {
    removeLocalStorageData();
  };

  const authProviderValue = {
    login,
    register,
    logout,
  };

  return (
    <AuthServiceContext.Provider value={authProviderValue}>
      {children}
    </AuthServiceContext.Provider>
  );
};

export { AuthServiceProvider, AuthServiceContext };
