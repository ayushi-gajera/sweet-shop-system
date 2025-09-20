import { createContext, useContext, useState, useEffect } from "react";
import { getToken } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(!!getToken());
  const [isAdmin, setIsAdmin] = useState(false);

  function decodeToken(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = decodeToken(token);
      setIsAdmin(payload?.isAdmin || false);
    }
  }, [logged]);

  return (
    <AuthContext.Provider value={{ logged, setLogged, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
