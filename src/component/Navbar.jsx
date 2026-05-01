// Import React so this component can return JSX.
import React from "react";
// Import Link for client-side navigation and useNavigate for button-based routing.
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import logoImage from "../images/logo.jpg";
import { FaUserCircle } from "react-icons/fa";

// This component renders the top navigation bar for the site.
const Navbar = () => {
  // Get the navigate function so buttons can move the user between routes.
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Default human icon URL (optional)
  const defaultAvatar = <FaUserCircle size={28} color="#ffd700" />;

  // Render the navigation header.
  return (
    <header className="header-modern">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Brand link returns the user to the home page without reloading the app. */}
          <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/">
            <img src={logoImage} width="40" height="40" alt="logo" className="me-2 rounded-circle glow-effect" />
            <span className="fw-bold text-neon">Paws & Homes</span>
          </Link>

{/* Navigation links - reduced to essential ones */}
          <nav className="d-none d-lg-flex">
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item me-4">
                <Link className="nav-link text-white hover-neon" to="/">Home</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link text-white hover-neon" to="/ourdogs">Our Dogs</Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link text-white hover-neon" to="/about">About Us</Link>
              </li>
              {user && (user.role_name?.toLowerCase() === "administrator" || user.role?.toLowerCase() === "administrator" || user.role_name?.toLowerCase() === "distributer" || user.role?.toLowerCase() === "distributer") && (
                <li className="nav-item me-4">
                  <Link className="nav-link text-white hover-neon" to="/addproducts">Add Puppy</Link>
                </li>
              )}
            </ul>
          </nav>

{/* Auth buttons */}
          <div className="d-flex align-items-center">
            {/* Auth buttons - Show user info if logged in */}
            {user ? (
              <div className="d-flex align-items-center">
                {/* Show user image if available, else default icon */}
                <div className="d-flex align-items-center me-3">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="User Avatar"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        objectFit: "cover",
                        border: "2px solid #d63384"
                      }}
                    />
                  ) : (
                    <span style={{ marginRight: "8px" }}>{defaultAvatar}</span>
                  )}
<span className="username-label me-3">
                    Hello, {user.username || user.email} ({user.role})
                  </span>
                </div>
                <button className="btn btn-modern-outline" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <button className="btn btn-modern-outline me-2" onClick={() => navigate("/signin")}>
                  Sign In
                </button>
                <button className="btn btn-modern me-2" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

{/* Mobile navigation */}
        <div className="collapse d-lg-none" id="mobileNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/ourdogs">Our Dogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About Us</Link>
            </li>
{user && (user.role_name?.toLowerCase() === "administrator" || user.role?.toLowerCase() === "administrator" || user.role_name?.toLowerCase() === "distributer" || user.role?.toLowerCase() === "distributer") && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/addproducts">Add Puppy</Link>
              </li>
            )}
            {user ? (
              <>
<li className="nav-item">
                  <span className="nav-link text-white">Hello, {user.username || user.email} ({user.role})</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-modern-outline w-100 mt-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

// Export the header so other pages can reuse it.
export default Navbar;
