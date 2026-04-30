import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // check if user exists and is admin
  if (!user || user.is_admin !== 1) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default AdminRoute;