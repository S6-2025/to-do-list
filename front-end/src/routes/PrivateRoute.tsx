// src/routes/PrivateRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function PrivateRoute({ children, allowedRoles }: Props) {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/unauthorized" />; // página que você pode criar
  }

  return children;
}
