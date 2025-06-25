import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { token, role } = useAuth();

  // Enquanto carrega estado auth (se quiser implementar async), pode retornar null ou spinner
  if (token === null) {
 
    return <Navigate to="/landing" replace />;
  }

  if (!token) {
    // Se não está logado, redireciona para landing
    return <Navigate to="/landing" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Se role não autorizada, redireciona para página de acesso negado
    return <Navigate to="/unauthorized" replace />;
  }

  // Se tudo ok, renderiza o conteúdo
  return children;
}
