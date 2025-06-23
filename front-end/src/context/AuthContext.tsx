import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { setAuthToken } from "../services/Api";

type Role = "PO" | "SM" | "EMPLOYEE";

interface JwtPayload {
  role: Role;
}

interface AuthContextType {
  token: string | null;
  role: Role | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      applyToken(savedToken);
    }
  }, []);

  const applyToken = (token: string) => {
    setTokenState(token);
    sessionStorage.setItem("token", token);
    setAuthToken(token);

    try {
      const decoded = (jwtDecode as any).default(token);

      setRole(decoded.role || null);
    } catch (error) {
      console.error("Invalid token:", error);
      setRole(null);
    }
  };

  const setToken = (token: string) => {
    applyToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setTokenState(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
