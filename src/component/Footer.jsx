import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#4e4444',
        color: '#fff',
        padding: '50px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Top Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '40px',
        textAlign: 'left'
      }}>
        {/* Brand Column */}
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '20px' }}>
          <h2 style={{ color: '#eb5c4f', fontSize: '1.8rem', marginBottom: '10px' }}>
            🎂 Merbles Cakes
          </h2>
          <p style={{ color: '#ccc', lineHeight: '1.5' }}>
            Delicious cakes delivered to your door. Celebrate every moment with sweetness and style!
          </p>
        </div>
 
        {/* Quick Links Column */}
       <div style={{ flex: '1', minWidth: '150px', marginBottom: '20px', paddingLeft:'20px' }}>
            <h3 style={{ color: '#ffcc00', marginBottom: '10px' }}>Quick Links</h3>
            {/* Quick Links Column in Footer */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/" style={linkStyle}>Home</Link></li>
            <li><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
            
            </ul>
        </div>

         {/* Social Media Column */}
        <div style={{ flex: '1', minWidth: '150px', marginBottom: '20px' }}>
          <h3 style={{ color: '#ffcc00', marginBottom: '10px' }}>Follow Us</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['🍩 Instagram', '🎂 Facebook', '🍪 Twitter'].map((social, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>
                <a href="#" style={socialLinkStyle}>{social}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div style={{ flex: '1', minWidth: '200px', marginBottom: '20px' }}>
          <h3 style={{ color: '#ffcc00', marginBottom: '10px' }}>Contact</h3>
          <p style={{ color: '#ccc', marginBottom: '5px' }}>📞 +254 712 345 678</p>
          <p style={{ color: '#ccc', marginBottom: '5px' }}>✉️ hello@sweetcakes.com</p>
          <p style={{ color: '#ccc' }}>📍 Kisumu, Kenya</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        borderTop: '1px solid #333',
        paddingTop: '20px',
        textAlign: 'center',
        color: '#888',
        fontSize: '0.9rem'
      }}>
        &copy; {new Date().getFullYear()} Sweet Cakes. All Rights Reserved.
      </div>
    </footer>
  );
};

// Link Styles
const linkStyle = {
  color: '#ffcc00',
  textDecoration: 'none',
  transition: 'color 0.3s',
  fontWeight: '500',
  display: 'inline-block',
};

const socialLinkStyle = {
  color: '#ff6f61',
  textDecoration: 'none',
  transition: 'transform 0.3s, color 0.3s',
  fontWeight: '500',
  display: 'inline-block',
};

// Hover effects (inline style approach)
const addHoverEffects = () => {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.onmouseenter = () => {
      link.style.color = '#fff';
      link.style.transform = 'scale(1.1)';
    };
    link.onmouseleave = () => {
      link.style.color = '';
      link.style.transform = 'scale(1)';
    };
  });
};
document.addEventListener('DOMContentLoaded', addHoverEffects);

export default Footer;