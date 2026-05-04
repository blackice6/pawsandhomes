export const ROLE_NAME_BY_ID = {
  1: "Administrator",
  2: "Distributor", 
  3: "Delivery",
  4: "Customer"
};

export const getUserRoleId = (user) => {
  if (!user) return null;
  
  // Direct role_id check first (primary from backend)
  if (user.role_id !== undefined) {
    return parseInt(user.role_id);
  }
  
  // Fallback to role_name mapping
  if (user.role_name) {
    for (const [id, name] of Object.entries(ROLE_NAME_BY_ID)) {
      if (name.toLowerCase() === user.role_name.toString().toLowerCase()) {
        return parseInt(id);
      }
    }
  }
  
  // Fallback to role string mapping
  if (user.role) {
    for (const [id, name] of Object.entries(ROLE_NAME_BY_ID)) {
      if (name.toLowerCase() === user.role.toString().toLowerCase()) {
        return parseInt(id);
      }
    }
  }
  
  return null;
};

export const getRoleNameById = (roleId) => {
  return ROLE_NAME_BY_ID[roleId] || "Unknown";
};

export const hasRole = (user, allowedRoleIds) => {
  const roleId = getUserRoleId(user);
  return roleId && allowedRoleIds.includes(roleId);
};
