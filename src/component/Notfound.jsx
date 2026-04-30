import React from "react";
import { Link } from "react-router-dom";
import "../css/Notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="notfound-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-text">
          Oops... the page you are looking for does not exist, was moved, or is
          hiding in the shadows.
        </p>

        <div className="button-group">
          <Link to="/" className="home-btn">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;