import React, { useState } from "react";
import { Link } from "react-router-dom";
import fbIcon from "../images/fb.png";
import inIcon from "../images/in.png";
import xIcon from "../images/x.png";
import logoImg from "../images/logo.jpg";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/ourdogs", label: "Our Dogs" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/signin", label: "Sign In" },
  { to: "/signup", label: "Sign Up" },
];

const socialLinks = [
  { href: "https://www.facebook.com/elvisdogs", label: "Facebook", icon: fbIcon },
  { href: "https://www.instagram.com/elvisdogs", label: "Instagram", icon: inIcon },
  { href: "https://www.x.com/elvisdogs", label: "X", icon: xIcon },
];

const footerFeatures = [
  "Health Guaranteed",
  "Fully Vaccinated",
  "Safe Delivery",
  "Lifetime Support",
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    setMessage(`Thanks! We'll send puppy updates to ${email}.`);
    setEmail("");
  };

  return (
    <footer
      className="row g-0"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        color: "white",
      }}
    >
      <div className="col-lg-3 col-md-6 p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        <img
          src={logoImg}
          width="60"
          height="60"
          alt="Paws & Homes logo"
          style={{ borderRadius: "50%", border: "3px solid #667eea", marginBottom: "16px" }}
        />
        <h5 style={{ fontWeight: "bold", marginBottom: "15px", color: "#99ccff" }}>Paws & Homes</h5>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#d0d0d0" }}>
          Helping Kenyan families find healthy, well-socialized puppies from trusted breeders.
        </p>
      </div>

      <div className="col-lg-3 col-md-6 p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        <h5 style={{ fontWeight: "bold", marginBottom: "20px", color: "#99ccff" }}>Contact Info</h5>
        <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}><b>Phone:</b> +254 700 123 456</p>
        <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}><b>Email:</b> info@pawsandhomes.com</p>
        <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}><b>Location:</b> Nairobi, Kenya</p>

        <h6 style={{ color: "#99ccff", margin: "20px 0 10px", fontSize: "12px" }}>Quick Links</h6>
        {quickLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{ display: "block", color: "#dbeafe", textDecoration: "none", fontSize: "12px", margin: "7px 0" }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="col-lg-3 col-md-6 p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        <h5 style={{ fontWeight: "bold", marginBottom: "20px", color: "#99ccff" }}>Follow Us</h5>
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                border: "2px solid #667eea",
                borderRadius: "50%",
                background: "rgba(102, 126, 234, 0.2)",
              }}
            >
              <img src={social.icon} alt="" style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
            </a>
          ))}
        </div>

        <form onSubmit={handleSubscribe}>
          <label htmlFor="footer-email" style={{ color: "#99ccff", marginBottom: "10px", fontSize: "12px", display: "block" }}>
            Puppy Updates
          </label>
          <input
            id="footer-email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{
              width: "100%",
              padding: "9px",
              border: "1px solid #667eea",
              borderRadius: "6px",
              background: "rgba(102, 126, 234, 0.1)",
              color: "white",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "9px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </button>
        </form>
        {message && <p style={{ color: "#bbf7d0", fontSize: "12px", marginTop: "10px" }}>{message}</p>}
      </div>

      <div className="col-lg-3 col-md-6 p-4">
        <h5 style={{ fontWeight: "bold", marginBottom: "20px", color: "#99ccff" }}>Why Choose Us</h5>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "13px", color: "#d0d0d0", marginBottom: "24px" }}>
          {footerFeatures.map((feature) => (
            <li key={feature} style={{ marginBottom: "10px" }}>{feature}</li>
          ))}
        </ul>
        <p style={{ fontSize: "11px", color: "#999", marginBottom: 0 }}>
          Paws & Homes © 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
