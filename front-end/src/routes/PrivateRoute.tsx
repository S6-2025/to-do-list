import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Role = "PO" | "SM" | "EMPLOYEE";

interface Props {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export default function PrivateRoute({ children, allowedRoles }: Props) {
  const { token, role } = useAuth();

  if (!token) {
    // Não está logado
    return <Navigate to="/landing" replace />;
  }

  if (!role) {
    // Token presente mas role ainda não carregada - pode mostrar loading ou redirecionar
    return <div>Loading permissions...</div>;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Não tem permissão para essa rota
    return <Navigate to="/unauthorized" replace />; // ou "/landing"
  }

  // Tudo certo, renderiza filhos
  return <>{children}</>;
}
