// import type { JSX } from "react";
// import React from "react";
// import { Navigate } from "react-router-dom";

// interface PublicRouteProps {
//   children: JSX.Element;
// }

// const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
//   const token = sessionStorage.getItem("token");

//   if (token) {
//     return <Navigate to="/result" replace />;
//   }

//   return children;
// };

// export default PublicRoute;