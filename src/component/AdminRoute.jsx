import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ROLE_NAME_BY_ID = {
  1: "administrator",
  2: "distributer",
  3: "delivery",
  4: "customer",
};

const normalizeRole = (user) => {
  if (!user) return null;
  if (user.role_name) return user.role_name.toString().toLowerCase();
  if (user.role) return user.role.toString().toLowerCase();
  if (user.role_id) return ROLE_NAME_BY_ID[user.role_id] || null;
  return null;
};

const AdminRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  const userRole = normalizeRole(user);
  const isAllowed =
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => role.toString().toLowerCase() === userRole);

  if (!isAllowed) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;