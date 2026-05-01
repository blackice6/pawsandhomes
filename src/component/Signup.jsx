import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Register.css";

const Signup = () => {
  // form hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // extra hook for confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");

  // status hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading("Please wait as registration is in progress...");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);
      formdata.append("role", role);

      const response = await axios.post(
        "https://blackice6.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess(response.data.message);

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setLoading("");
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        {loading && <h5 className="loading-text">{loading}</h5>}
        {success && <h3 className="success-text">{success}</h3>}
        {error && <h4 className="error-text">{error}</h4>}

        <div className="flex">
          <label>
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

        <label className="role-select-label">
          <span>Register as</span>
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="delivery">Delivery</option>
            <option value="distributer">Distributer</option>
            <option value="administrator">Administrator</option>
          </select>
        </label>

        <button className="submit" type="submit">
          Signup
        </button>

        <p className="signin">
          Already have an account? <Link to="/signin">Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;