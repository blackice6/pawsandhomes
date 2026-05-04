// Import React library with useState hook for managing local component state (form inputs, loading).
import React, { useState } from "react";
// Import axios library for making HTTP POST request to backend authentication API.
import axios from "axios";
// Import Link and useNavigate hooks from react-router-dom for navigation: Link for signup link, useNavigate for post-login redirect.
import { Link, useNavigate } from "react-router-dom";
// Import CapybaraLoader component - custom animated loader shown during auth request.
import CapybaraLoader from "./CapybaraLoader";

// Define Signin functional component - handles user login form and API submission.
const Signin = () => {
  // useState hook for email input - controlled input value synced with state.
  const [email, setEmail] = useState("");
  // useState hook for password input - controlled input stores secure password value.
  const [password, setPassword] = useState("");
  // useState hook for loading boolean - true during API call to show loader/disable form.
  const [loading, setLoading] = useState(false);
  // useState hook for success message string - shown after successful login.
  const [success, setSuccess] = useState("");
  // useState hook for error message string - shown on login failure (invalid creds/network).
  const [error, setError] = useState("");

  // useNavigate hook provides programmatic navigation after successful login.
  const navigate = useNavigate();

  // handleSubmit async function - triggered by form onSubmit, sends credentials to backend.
  const handleSubmit = async (event) => {
    // event.preventDefault() prevents full page reload on form submit.
    event.preventDefault();
    // Set loading true - shows loader, disables submit.
    setLoading(true);
    // Clear any previous error message.
    setError("");
    // Clear any previous success message.
    setSuccess("");

    try {
      // FormData object for POST body - backend expects multipart (even no file).
      const formdata = new FormData();
      // Append email from state to FormData (key matches backend expectation).
      formdata.append("email", email);
      // Append password from state to FormData.
      formdata.append("password", password);

      // axios.post to signin endpoint - awaits backend response.
      const response = await axios.post("https://blackice6.alwaysdata.net/api/signin", formdata);

      // Check if response contains user object (success indicator from backend).
      if (response.data.user) {
        // Store user data (incl token) in localStorage for auth persistence.
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Show temporary success message.
        setSuccess("Authentication successful. Redirecting...");
        // setTimeout delays redirect 1.5s for user to see success message.
        setTimeout(() => navigate("/"), 1500);
      } else {
        // Backend didn't return user - show credential error.
        setError("Invalid credentials. Please check your email or password.");
      }
    } catch (err) {
      // Handle axios/network errors - prefer backend message, fallback generic.
      setError(err.response?.data?.message || "An error occurred during sign in. Please try again later.");
    } finally {
      // Always set loading false - ends spinner regardless of success/error.
      setLoading(false);
    }
  };

  // return statement renders JSX - full Signin UI.
  return (
    // Root div with flex utilities for vertical centering, full viewport height, Poppins font.
    <div className="page-container d-flex flex-column min-vh-100 justify-content-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Inline <style> tag - scoped styles for auth card/inputs (no external CSS file). */}
      <style>{`
        .auth-card {
          background: #1f2436;
          border-radius: 20px;
          padding: 60px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          border: 1px solid #2a3042;
          margin: auto;
        }

        .auth-input {
          border: 1px solid #2a3042;
          background: #141829;
          color: white;
          border-radius: 15px;
          padding: 15px 20px;
          font-weight: 500;
          box-shadow: none;
        }

        .auth-input::placeholder { color: #7d8498; }

        .auth-input:focus {
          background: #141829;
          color: white;
          border-color: #00ff88;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.1);
        }
      `}</style>

      {/* Main auth card - centered dark panel with form. */}
      <div className="auth-card">
        {/* Centered title section. */}
        <div className="text-center mb-5">
          {/* Bold white heading. */}
          <h2 className="fw-bold text-white">Welcome Back</h2>
          {/* Muted subtitle. */}
          <p className="text-muted mb-0">Enter your details to access your account.</p>
        </div>

        {/* Conditional loader block - shows during loading=true. */}
        {loading && (
          <div className="mb-4 text-center">
            {/* CapybaraLoader animation. */}
            <CapybaraLoader />
            {/* Small status text below loader. */}
            <small className="d-block mt-2 text-primary">Authenticating...</small>
          </div>
        )}
        {/* Success Bootstrap alert (green). */}
        {success && <div className="alert alert-success border-0 rounded-4 mb-4">{success}</div>}
        {/* Error Bootstrap alert (red). */}
        {error && <div className="alert alert-danger border-0 rounded-4 mb-4">{error}</div>}

        {/* Main login form with onSubmit calling handleSubmit. */}
        <form onSubmit={handleSubmit}>
          {/* Email input group. */}
          <div className="mb-3">
            {/* Uppercase muted label. */}
            <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
            {/* Controlled email input with custom auth-input class. */}
            <input
              type="email"
              className="form-control auth-input"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Password input group. */}
          <div className="mb-4">
            {/* Flex layout for label + security hint. */}
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-bold text-muted text-uppercase">Password</label>
              <span className="small text-muted">Secure sign in</span>
            </div>
            {/* Controlled password input (type=password hides chars). */}
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* Submit button - gradient style, disabled/loading text. */}
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-100 rounded-pill fw-bold py-3 mb-4" style={{background: 'linear-gradient(135deg, #00ff88, #00d4ff)', border: 'none', color: '#0a0e1a'}}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Signup link section. */}
          <div className="text-center">
            {/* Text + Link to /signup route with custom color. */}
            <p className="text-muted small mb-0">
              Don't have an account?{" "}
              <Link to="/signup" className="fw-bold text-decoration-none" style={{color: '#00d4ff'}}>
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export component for use in routing (App.js).
export default Signin;
