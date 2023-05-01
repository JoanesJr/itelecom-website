import { createContext, useEffect, useState } from "react";
import { SignIn, SignOut, ValidIdToken } from "../firebase/index";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  });

  const signInEmailPassword = async ({ email, password }) => {
    try {
      const dataRes = await SignIn({ email, password });
      setUser(dataRes);
      sessionStorage.setItem("@AuthFirebase:token", dataRes.accessToken);
      sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(dataRes));
    } catch (err) {
      sessionStorage.removeItem("@AuthFirebase:token");
      sessionStorage.removeItem("@AuthFirebase:user");
    }
  };

  const signOutEmailPassword = async () => {
    await SignOut();
    sessionStorage.clear();
    setUser(null);
    navigate("/admin/super/login");
  };

  return (
    <AuthContext.Provider
      value={{ signInEmailPassword, signOutEmailPassword, signed: !!user, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
