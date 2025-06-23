import { createContext, useContext, useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode";
import { setAuthToken } from "../services/Api";

type Role = "PO" | "SM" | "EMPLOYEE";

interface JwtPayload {
  authorities?: string[]; // Pode ter esse campo no token
  roles?: string[];       // Ou esse
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

  // Função para decodificar token JWT com fallback para import compatível
  const decodeToken = (token: string): JwtPayload => {
    const decodeFunc = (jwtDecode as any).default || jwtDecode;
    return decodeFunc(token);
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      applyToken(savedToken);
    }
  }, []);

  const applyToken = (token: string) => {
     console.log("Applying token:", token);
    setTokenState(token);
    sessionStorage.setItem("token", token);
    setAuthToken(token);

    try {
      const decoded = decodeToken(token);
      console.log("Decoded JWT:", decoded);

      const authorities: string[] = decoded.authorities || decoded.roles || [];
      const roleString = authorities.length > 0 ? authorities[0] : null;

      const roleMap: Record<string, Role> = {
        ROLE_PO: "PO",
        ROLE_SM: "SM",
        ROLE_EMPLOYEE: "EMPLOYEE",
      };

      setRole(roleString ? roleMap[roleString] || null : null);
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
