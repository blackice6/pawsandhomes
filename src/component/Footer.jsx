// Import React so this component can return JSX.
import React from "react";
// Import Link for internal navigation inside the app.
import { Link } from "react-router-dom";
// Import images directly from the images folder
import fbIcon from "../images/fb.png";
import inIcon from "../images/in.png";
import xIcon from "../images/x.png";
import logoImg from "../images/logo.jpg";

// Social media link data used to render the follow-us buttons.
const socialLinks = [
  // Facebook profile link and icon path.
  { href: "https://www.facebook.com/elvisdogs", label: "Facebook", icon: fbIcon },
  // Instagram profile link and icon path.
  { href: "https://www.instagram.com/elvisdogs", label: "Instagram", icon: inIcon },
  // X profile link and icon path.
  { href: "https://www.x.com/elvisdogs", label: "X", icon: xIcon },
];

// List of selling points shown in the final footer column.
const footerFeatures = [
  "Champion Bloodlines",
  "Professional Training",
  "Health Guaranteed",
  "Lifetime Support",
  "Full Documentation",
  "Safe Delivery",
];

// This component renders the full site footer.
const Footer = () => {
  // Return the large top footer section and the smaller copyright footer section.
  return (
    <>
      {/* Main multi-column footer section. */}
      <section
        className="row g-0"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
          padding: "60px 20px",
          color: "white",
        }}
      >
        {/* Column 1: brand information and trust highlights. */}
        <div className="col-lg-3 col-md-6 p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
{/* Centered logo block. */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={logoImg}
              width="60"
              height="60"
              alt="logo"
              style={{ borderRadius: "50%", border: "3px solid #667eea" }}
            />
          </div>

          {/* Brand name heading. */}
          <h5 style={{ fontWeight: "bold", marginBottom: "15px", color: "#667eea" }}>Paws & Homes</h5>

          {/* Brand description text. */}
          <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#d0d0d0" }}>
            Premium dog breeding since 2026. We specialize in healthy, well-socialized puppies from champion bloodlines.
            Quality and care guaranteed.
          </p>

          {/* Short trust checklist. */}
          <div style={{ marginTop: "15px" }}>
            <p style={{ fontSize: "12px", color: "#999" }}>Health Certified</p>
            <p style={{ fontSize: "12px", color: "#999" }}>Fully Vaccinated</p>
            <p style={{ fontSize: "12px", color: "#999" }}>Professional Breeding</p>
          </div>
        </div>

        {/* Column 2: contact details and quick links. */}
        <div className="col-lg-3 col-md-6 p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
          <h5 style={{ fontWeight: "bold", marginBottom: "20px", color: "#667eea" }}>Contact Info</h5>

          {/* Contact information lines. */}
          <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}>
            <b>Phone:</b> +254 700 123 456
          </p>
          <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}>
            <b>Email:</b> info@pawsandhomes.com
          </p>
          <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}>
            <b>Location:</b> Nairobi, Kenya
          </p>
          <p style={{ margin: "10px 0", fontSize: "13px", color: "#d0d0d0" }}>
            <b>Hours:</b> 9 AM - 6 PM Daily
          </p>

          {/* Quick links block. */}
          <div style={{ marginTop: "20px" }}>
            <h6 style={{ color: "#667eea", marginBottom: "10px", fontSize: "12px" }}>Quick Links</h6>

            {/* Internal navigation links */}
            <p style={{ margin: "5px 0" }}>
              <Link to="/" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                Home
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/ourdogs" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                Our Dogs
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/how-to-adopt" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                How to Adopt
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/about" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                About Us
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/upcoming-litters" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                Coming Soon
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/faq" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                FAQ
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/resources" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                Resources
              </Link>
            </p>
            <p style={{ margin: "5px 0" }}>
              <Link to="/testimonials" style={{ color: "#99ccff", textDecoration: "none", fontSize: "12px" }}>
                Stories
              </Link>
            </p>
          </div>
        </div>

        {/* Column 3: social links and newsletter subscription form. */}
        <div className="col-lg-3 col-md-6 p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
          <h5 style={{ fontWeight: "bold", marginBottom: "20px", color: "#667eea" }}>Follow Us</h5>

          {/* Social icon button row. */}
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "25px" }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                style={{
                  display: "inline-block",
                  width: "45px",
                  height: "45px",
                  background: "rgba(102, 126, 234, 0.2)",
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "45px",
                  textDecoration: "none",
                  color: "#99ccff",
                  border: "2px solid #667eea",
                  transition: "all 0.3s",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => {
                  // Enlarge the icon button slightly when hovered.
                  e.target.style.transform = "scale(1.1)";
                  // Add a glow effect on hover.
                  e.target.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.4)";
                }}
                onMouseOut={(e) => {
                  // Reset the icon size after hover ends.
                  e.target.style.transform = "scale(1)";
                  // Remove the hover glow effect.
                  e.target.style.boxShadow = "none";
                }}
              >
                {/* Social icon image shown inside the circle button. */}
                <img
                  src={social.icon}
                  alt={social.label}
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </a>
            ))}
          </div>

          {/* Newsletter heading and description. */}
          <h6 style={{ color: "#667eea", marginBottom: "10px", fontSize: "12px" }}>Stay Updated</h6>
          <p style={{ fontSize: "12px", color: "#d0d0d0", marginBottom: "10px" }}>
            Subscribe to our newsletter for new arrivals and special offers.
          </p>

          {/* Newsletter email input. */}
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #667eea",
              borderRadius: "5px",
              background: "rgba(102, 126, 234, 0.1)",
              color: "white",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          />

          {/* Newsletter subscribe button. */}
          <button
            type="button"
            style={{
              width: "100%",
              padding: "8px",
              background: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Subscribe
          </button>
        </div>

        {/* Column 4: reasons to choose the business. */}
        <div className="col-lg-3 col-md-6 p-4">
          <h5 style={{ fontWeight: "bold", marginBottom: "20px", color: "#667eea" }}>Why Paws & Homes</h5>

          {/* Feature list rendered from the footerFeatures array. */}
          <ul style={{ listStyle: "none", padding: 0, fontSize: "13px", color: "#d0d0d0", marginBottom: 0 }}>
            {footerFeatures.map((feature) => (
              <li key={feature} style={{ marginBottom: "10px" }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom copyright bar. */}
      <footer
        className="text-center"
        style={{
          background: "linear-gradient(90deg, #0a0e27 0%, #1a1a2e 100%)",
          padding: "30px 20px",
          color: "#d0d0d0",
          borderTop: "3px solid #667eea",
        }}
      >
        {/* Copyright and branding text. */}
        <div style={{ marginBottom: "15px" }}>
          <p style={{ fontSize: "12px", margin: "5px 0" }}>
            <b>Paws & Homes © 2026</b> | Premium Dog Breeding & Sales
          </p>
          <p style={{ fontSize: "11px", margin: "5px 0", color: "#999" }}>
            All rights reserved | Designed with love for dog lovers
          </p>
        </div>

        {/* Small policy links area below the divider line. */}
        <div style={{ borderTop: "1px solid rgba(102, 126, 234, 0.3)", paddingTop: "15px", marginTop: "15px" }}>
          <p style={{ fontSize: "11px", color: "#999", marginBottom: 0 }}>
            Privacy Policy | Terms & Conditions | Health Guarantee | Return Policy
          </p>
        </div>
      </footer>
    </>
  );
};

// Export the footer so pages can reuse it.
export default Footer;
