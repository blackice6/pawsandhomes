import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserRoleId } from "../utils/roleUtils.js";

const ROLE_NAME_BY_ID = {
  1: "administrator",
  2: "distributer",
  3: "delivery",
  4: "customer",
};

const normalizeRole = (user) => {
  if (!user) return null;
  const roleId = getUserRoleId(user);
  return ROLE_NAME_BY_ID[roleId] || null;
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