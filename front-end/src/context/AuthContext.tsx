import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "jose";

import { setAuthToken } from "../services/Api";

type Role = "PO" | "SM" | "EMPLOYEE";

interface JwtPayload {
  authorities?: string[];
  roles?: string[];
  role?: string;
  // outros campos que seu token possa ter...
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

  const decodeToken = (token: string): JwtPayload => {
    return decodeJwt(token);
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      applyToken(savedToken);
    }
  }, []);

  const applyToken = (token: string) => {
    console.log("Applying token:", token);

    if (!token || token.trim() === "") {
      console.warn("Empty or invalid token passed to applyToken");
      setRole(null);
      setTokenState(null);
      sessionStorage.removeItem("token");
      setAuthToken("");
      return;
    }

    setTokenState(token);
    sessionStorage.setItem("token", token);
    setAuthToken(token);

    try {
      const decoded = decodeToken(token);
      console.log("Decoded JWT full payload:", decoded);

      const roleString = decoded.role;

      const roleMap: Record<string, Role> = {
        ROLE_PO: "PO",
        ROLE_SM: "SM",
        ROLE_EMPLOYEE: "EMPLOYEE",
      };

      const mappedRole = roleString ? roleMap[roleString] || null : null;
      console.log("Role string from token:", roleString);
      console.log("Mapped role:", mappedRole);

      setRole(mappedRole);
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
    setAuthToken("");
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
