import React, { useState } from "react";
import axios from "axios";
import "../css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const form = new FormData();
form.append("name", formData.name);
form.append("email", formData.email);
form.append("message", formData.message);

const response = await axios.post(
  "https://blackice6.alwaysdata.net/api/contact_us",
  form
);
      setSuccess(response.data.message || "Your message has been sent successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 5000);
     
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
    console.log("Backend error:", err.response?.data);
    setError(err.response?.data?.message || "Failed to send message. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-left">
          <h1>Contact Merble Cakes</h1>
          <p>
            We would love to hear from you. Whether you want to place an order,
            ask about our Merble cakes, or share your sweet experience, our
            team is ready to help.
          </p>

          <div className="contact-info">
            <p><strong>📍 Address:</strong> Kisumu, Kenya</p>
            <p><strong>📞 Phone:</strong> +254 729 932 162</p>
            <p><strong>✉️ Email:</strong> Merblecake@gmail.com</p>
            <p><strong>⏰ Opening Hours:</strong> Mon - Sat, 8:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send Us a Message</h2>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;