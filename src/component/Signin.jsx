import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../css/LoginForm.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://blackice6.alwaysdata.net/api/signin",
        formdata
      );

      setLoading(false);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess("Login successful");
        navigate("/");
      } else {
        setError("Login failed. Please try again...");
      }
    } catch (error) {
      setLoading(false);
      setError("Oops, something went wrong. Try again...");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const googleUser = res.data;

        localStorage.setItem("user", JSON.stringify(googleUser));
        setSuccess("Google login successful");
        navigate("/");
      } catch (err) {
        setError("Google sign in failed");
      }
    },
    onError: () => {
      setError("Google sign in failed");
    },
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2e2d2d",
        padding: "20px",
      }}
    >
      <form className="form_container" onSubmit={handlesubmit}>
        <div className="logo_container"></div>

        <div className="title_container">
          <p className="title">Login to your Account</p>
          <span className="subtitle">
            Get started with our app, just create an account and enjoy the
            experience.
          </span>
        </div>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p style={{ fontSize: "12px", marginTop: "8px" }}>
              Please wait while we authenticate your account...
            </p>
          </div>
        )}

        {success && (
          <h3
            style={{
              color: "green",
              fontSize: "14px",
              textAlign: "center",
              margin: 0,
            }}
          >
            {success}
          </h3>
        )}

        {error && (
          <h4
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              margin: 0,
            }}
          >
            {error}
          </h4>
        )}

        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>
          <input
            placeholder="name@mail.com"
            title="Email"
            name="email"
            type="email"
            className="input_field"
            id="email_field"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input_container">
  <label className="input_label" htmlFor="password_field">
    Password
  </label>

  <div className="password_wrapper">
    <input
      placeholder="Password"
      title="Password"
      name="password"
      type={showPassword ? "text" : "password"}
      className="input_field"
      id="password_field"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="eye_btn"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>

        <button
          title="Sign In"
          type="submit"
          className="sign-in_btn"
          disabled={loading}
        >
          <span>{loading ? "Signing in..." : "Sign In"}</span>
        </button>

        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>

        
        <button
          title="Sign In with Google"
          type="button"
          className="sign-in_ggl"
          onClick={() => googleLogin()}
        >
          <span>Sign In with Google</span>
        </button>

        <button
          title="Sign In with Apple"
          type="button"
          className="sign-in_apl"
        >
          <span>Sign In with Apple</span>
        </button>

        <p className="note">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;