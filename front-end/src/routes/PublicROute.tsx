import type { JSX } from "react";
import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");

  // Se estiver logado, redireciona para o /todo
  if (token) {
    return <Navigate to="/todo" replace />;
  }

  return children;
};

export default PublicRoute;
