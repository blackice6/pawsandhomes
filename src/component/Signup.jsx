// Import axios library for making HTTP POST request to backend signup API endpoint.
import axios from "axios";
// Import React library with useState hook for managing form state.
import React, { useState } from "react";
// Import Link component from react-router-dom for client-side navigation to signin page.
import { Link } from "react-router-dom";
// Import CSS file containing all styling for the signup form layout and animations.
import "../css/AuthForm.css";

// Define Signup functional component - handles new user registration form.
const Signup = () => {
  // useState hook for username input - controlled value from text input.
  const [username, setUsername] = useState("");
  // useState hook for email input - validated email format on backend.
  const [email, setEmail] = useState("");
  // useState hook for password input - secure password storage.
  const [password, setPassword] = useState("");
  // useState hook for phone input - telephone number field.
  const [phone, setPhone] = useState("");

  // useState hook for password confirmation - validates password match client-side.
  const [confirmPassword, setConfirmPassword] = useState("");

  // useState hook for loading string - shows status message during API call.
  const [loading, setLoading] = useState("");
  // useState hook for success string - displays backend success message.
  const [success, setSuccess] = useState("");
  // useState hook for error string - displays validation/API errors.
  const [error, setError] = useState("");
  
  // handleSubmit async function - triggered by form submission.
  const handleSubmit = async (e) => {
    // e.preventDefault() prevents default form submission (page reload).
    e.preventDefault();

    // Clear previous error before validation.
    setError("");
    // Clear previous success.
    setSuccess("");

    // Client-side validation: check if passwords match.
    if (password !== confirmPassword) {
      // Set specific error if passwords don't match.
      setError("Passwords do not match");
      // Early return to stop submission.
      return;
    }

    // Set loading message to inform user registration in progress.
    setLoading("Please wait as registration is in progress...");

    try {
      // FormData object for multipart POST (backend expects this format).
      const formdata = new FormData();
      // Append username to FormData (key: "username").
      formdata.append("username", username);
      // Append email.
      formdata.append("email", email);
      // Append password (hashed on backend).
      formdata.append("password", password);
      // Append phone number.
      formdata.append("phone", phone);

      // axios.post to signup endpoint - sends FormData with all user details.
      const response = await axios.post(
        "https://blackice6.alwaysdata.net/api/signup",
        formdata
      );

      // Clear loading on success.
      setLoading("");
      // Set success message from backend response.
      setSuccess(response.data.message);

      // Reset all form fields to empty after successful registration.
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");

      // Auto-clear success message after 5 seconds.
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      // Clear loading on error.
      setLoading("");
      // Set error from backend response or fallback.
      setError(error.response?.data?.message || error.message);
    }
  };

  // return JSX renders complete signup UI.
  return (
    // Root container with CSS class for full-page layout.
    <div className="signup-container">
      {/* Main form element with onSubmit handler. */}
      <form className="form" onSubmit={handleSubmit}>
        {/* Main title text. */}
        <p className="title">Register</p>
        {/* Subtitle encouraging signup. */}
        <p className="message">Signup now and get full access to our app.</p>

        {/* Conditional loading text. */}
        {loading && <h5 className="loading-text">{loading}</h5>}
        {/* Conditional success heading. */}
        {success && <h3 className="success-text">{success}</h3>}
        {/* Conditional error heading. */}
        {error && <h4 className="error-text">{error}</h4>}

        {/* Flex row for username/phone inputs. */}
        <div className="flex">
          {/* Username label + floating input. */}
          <label>
            {/* Controlled text input with floating label effect via CSS. */}
            <input
              className="input"
              type="text"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span>Username</span>
          </label>

          {/* Phone label + input. */}
          <label>
            <input
              className="input"
              type="tel"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <span>Phone</span>
          </label>
        </div>

        {/* Email input group. */}
        <label>
          <input
            className="input"
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Email</span>
        </label>

        {/* Password input. */}
        <label>
          <input
            className="input"
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </label>

        {/* Confirm password input. */}
        <label>
          <input
            className="input"
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span>Confirm Password</span>
        </label>

        {/* Submit button with custom class. */}
        <button className="submit" type="submit">
          Signup
        </button>

        {/* Signin link section. */}
        <p className="signin">
          Already have an account? <Link to="/signin">Signin</Link>
        </p>
      </form>
    </div>
  );
};

// Export component for routing in App.js.
export default Signup;
