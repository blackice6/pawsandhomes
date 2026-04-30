import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import cake from "../image/download.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Default human icon URL (optional)
  const defaultAvatar = <FaUserCircle size={28} color="#ffd700" />;

  return (
    <nav className="cake-navbar navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
          <img src={cake} alt="" width="50px" height="50px" /> Merbles Cakes
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cakeNavbar"
          aria-controls="cakeNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="cakeNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link cake-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link cake-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link cake-link" to="/contact">
                Contact
              </Link>
            </li>

            {user && user.is_admin === 1 && (
              <li className="nav-item">
                <Link className="nav-link cake-link" to="/addcakes">
                  Add Cakes
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item d-flex align-items-center">
                {/* Show user image if available, else default icon */}
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
                    }}
                  />
                ) : (
                  <span style={{ marginRight: "8px" }}>{defaultAvatar}</span>
                )}

                <span className="nav-link username-label">
                  Hello, {user.username}
                </span>
              </li>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link cake-link" to="/signin">
                    Sign in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link order-btn" to="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;