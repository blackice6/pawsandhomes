// Import React library - required for creating JSX components and component lifecycle.
import React from "react";
// Import Link and useNavigate from react-router-dom - Link for route links, useNavigate for programmatic routing (logout).
import { Link, useNavigate } from "react-router-dom";
// Import CSS file - contains all navbar styling (neon effects, responsive, hover animations).
import "../css/Navbar.css";
// Import logo image asset - displayed as brand icon in navbar.
import logoImage from "../images/logo.jpg";
// Import FaUserCircle icon from react-icons - fallback user avatar if no profile image.
import { FaUserCircle } from "react-icons/fa";
// Import utility functions from roleUtils - determines user role from localStorage for conditional UI.
import { getUserRoleId, getRoleNameById } from "../utils/roleUtils.js";

// Define Navbar functional component - renders top navigation bar with auth/roles.
const Navbar = () => {
  // useNavigate hook - provides navigate function for logout redirect.
  const navigate = useNavigate();
  // Parse user object from localStorage - contains auth data after login.
  const user = JSON.parse(localStorage.getItem("user"));

  // getUserRoleId utility call - extracts role ID from user object.
  const userRoleId = getUserRoleId(user);
  // getRoleNameById utility - converts role ID to readable name (Customer/Admin).
  const roleName = userRoleId ? getRoleNameById(userRoleId) : "Customer";

  // handleLogout function - clears auth and redirects to signin.
  const handleLogout = () => {
    // removeItem clears user data from localStorage (ends session).
    localStorage.removeItem("user");
    // Navigate to signin route.
    navigate("/signin");
  };

  // defaultAvatar JSX - FaUserCircle icon as fallback if no user image.
  const defaultAvatar = React.createElement(FaUserCircle, { size: 28, color: "#ffd700" });

  // Boolean for conditional admin/distributor links - roles 1/2 get Add Puppy button.
  const isAdminOrDistributor = userRoleId === 1 || userRoleId === 2;

  // return JSX - full navbar structure.
  return React.createElement('header', { className: "header-modern" }, [
    // Container-fluid for full width with internal padding control.
    React.createElement('div', { className: "container-fluid" }, [
      // Flex layout for logo + nav + auth buttons + mobile toggle.
      React.createElement('div', { className: "d-flex justify-content-between align-items-center py-3" }, [
        // Brand/logo link - home route.
        React.createElement(Link, { className: "navbar-brand d-flex align-items-center text-decoration-none", to: "/" }, [
          // Logo image with rounded glow effect.
          React.createElement('img', { src: logoImage, width: "40", height: "40", alt: "logo", className: "me-2 rounded-circle glow-effect" }),
          // Brand text with neon gradient.
          React.createElement('span', { className: "fw-bold text-neon" }, "Paws & Homes")
        ]),

        // Desktop navigation - hidden on mobile (d-none d-lg-flex).
        React.createElement('nav', { className: "d-none d-lg-flex" }, [
          // Nav list as flex row.
          React.createElement('ul', { className: "navbar-nav d-flex flex-row" }, [
            // Home link.
            React.createElement('li', { className: "nav-item me-4" }, [
              React.createElement(Link, { className: "nav-link text-white hover-neon", to: "/" }, "Home")
            ]),
            // Our Dogs link.
            React.createElement('li', { className: "nav-item me-4" }, [
              React.createElement(Link, { className: "nav-link text-white hover-neon", to: "/ourdogs" }, "Our Dogs")
            ]),
            // About Us link.
            React.createElement('li', { className: "nav-item me-4" }, [
              React.createElement(Link, { className: "nav-link text-white hover-neon", to: "/about" }, "About Us")
            ]),
            // Conditional Add Puppy for admins/distributors.
            user && isAdminOrDistributor && React.createElement('li', { className: "nav-item me-4" }, [
              React.createElement(Link, { className: "nav-link text-white hover-neon", to: "/addproducts" }, "Add Puppy")
            ])
          ])
        ]),

        // Right auth/user section - flex aligned.
        React.createElement('div', { className: "d-flex align-items-center" }, [
          // Show user panel if logged in.
          user ? React.createElement('div', { className: "d-flex align-items-center" }, [
            // User avatar section.
            React.createElement('div', { className: "d-flex align-items-center me-3" }, [
              // Conditional profile image or default icon.
              user.profile_image ? React.createElement('img', {
                src: user.profile_image,
                alt: "User Avatar",
                style: {
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  marginRight: "8px",
                  objectFit: "cover",
                  border: "2px solid #d63384"
                }
              }) : React.createElement('span', { style: { marginRight: "8px" } }, defaultAvatar),
              // User info stack.
              React.createElement('div', null, [
                // Username display.
                React.createElement('span', { className: "username-label" }, `Hello, ${user.username || user.email}`),
                // Role badge.
                React.createElement('div', { className: "role-label text-muted", style: { fontSize: "12px" } }, `Role: ${roleName}`)
              ])
            ]),

            // Logout button.
            React.createElement('button', { className: "btn btn-modern-outline", onClick: handleLogout }, "Logout")
          ]) : React.createElement('div', { className: "d-flex align-items-center" }, [
            // Sign In button.
            React.createElement('button', { className: "btn btn-modern-outline me-2", onClick: () => navigate("/signin") }, "Sign In"),
            // Sign Up button.
            React.createElement('button', { className: "btn btn-modern me-2", onClick: () => navigate("/signup") }, "Sign Up")
          ])
        ]),

        // Mobile hamburger toggle - Bootstrap collapse trigger.
        React.createElement('button', { className: "navbar-toggler d-lg-none", type: "button", 'data-bs-toggle': "collapse", 'data-bs-target': "#mobileNav" }, [
          React.createElement('span', { className: "navbar-toggler-icon" })
        ])
      ])
    ]),

    // Collapsible mobile nav - hidden on desktop.
    React.createElement('div', { className: "collapse d-lg-none", id: "mobileNav" }, [
      // Mobile nav list.
      React.createElement('ul', { className: "navbar-nav" }, [
        // Mobile home link.
        React.createElement('li', { className: "nav-item" }, [
          React.createElement(Link, { className: "nav-link text-white", to: "/" }, "Home")
        ]),
        // Mobile dogs link.
        React.createElement('li', { className: "nav-item" }, [
          React.createElement(Link, { className: "nav-link text-white", to: "/ourdogs" }, "Our Dogs")
        ]),
        // Mobile about link.
        React.createElement('li', { className: "nav-item" }, [
          React.createElement(Link, { className: "nav-link text-white", to: "/about" }, "About Us")
        ]),
        // Mobile conditional admin link.
        user && isAdminOrDistributor && React.createElement('li', { className: "nav-item" }, [
          React.createElement(Link, { className: "nav-link text-white", to: "/addproducts" }, "Add Puppy")
        ]),

        // Mobile user/auth section.
        user ? React.createElement(React.Fragment, null, [
          // Mobile user greeting.
          React.createElement('li', { className: "nav-item" }, [
            React.createElement('span', { className: "nav-link text-white" }, `Hello, ${user.username || user.email}`),
            React.createElement('span', { className: "nav-link text-muted", style: { fontSize: "12px" } }, `Role: ${roleName}`)
          ]),

          // Mobile logout.
          React.createElement('li', { className: "nav-item" }, [
            React.createElement('button', { className: "btn btn-modern-outline w-100 mt-2", onClick: handleLogout }, "Logout")
          ])
        ]) : React.createElement(React.Fragment, null, [
          // Mobile sign in.
          React.createElement('li', { className: "nav-item" }, [
            React.createElement(Link, { className: "nav-link text-white", to: "/signin" }, "Sign In")
          ]),
          // Mobile sign up.
          React.createElement('li', { className: "nav-item" }, [
            React.createElement(Link, { className: "nav-link text-white", to: "/signup" }, "Sign Up")
          ])
        ])
      ])
    ])
  ]);

};

// Export Navbar for use in other components/pages.
export default Navbar;
