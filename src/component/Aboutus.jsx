import React from "react";
import "../css/About.css";
import MerblesCake from "../image/img_3202-scaled.jpg";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-overlay">
          <h1>About Our paws and homes</h1>
          <p>
            We are a dedicated dog rescue center committed to finding loving homes for dogs in need. Our mission is to provide a safe haven and connect compassionate families with their perfect canine companions.
          </p>
        </div>
      </div>

      <div className="about-container">
        <div className="about-image-section">
          <img src={MerblesCake} alt="Merbles Cake" className="about-image" />
        </div>

        <div className="about-text-section">
          <h2>Our Story</h2>
          <p>
          Paws & Hope Rescue Center is a sanctuary dedicated to giving every dog a second chance. Our story began with a single rescue, evolving into a community where countless forgotten, abandoned, and mistreated animals find comfort, medical care, and loving forever homes. Each wagging tail tells a tale of resilience and hope, fueled by our passionate team and generous supporters.
          </p>

          <p>
          What truly sets Paws & Hope apart is our holistic approach to rescue and rehabilitation. We believe that true healing goes beyond just food and shelter; it encompasses comprehensive medical attention, specialized behavioral training, and an unwavering commitment to finding the perfect match for every dog. Our dedicated network of passionate volunteers and staff works tirelessly, creating personalized care plans and fostering a supportive, compassionate environment. Furthermore, we pride ourselves on extensive community outreach and robust adoption follow-up programs, ensuring that each placement is not just a temporary fix, but a successful, lifelong bond built on trust and love. This comprehensive ecosystem of care, compassion, and community is what makes Paws & Hope truly special.
          </p>

          <p>
          Finding your perfect companion is a deeply personal and transformative journey, and at Paws & Hope, we understand that connection is paramount. Whether you are seeking a loyal friend to share quiet moments, an energetic partner for adventures, or a comforting presence to brighten your days, a rescue pet offers boundless, unconditional love. We meticulously guide potential adopters through a thoughtful process, considering lifestyle, personality, and specific needs to ensure a harmonious match. Adopting a pet isn't just about bringing an animal into your home; it's about enriching your life with a steadfast companion and offering a deserving dog a genuine forever family. Discover the profound joy and fulfillment that comes from giving a rescue dog a chance to be your devoted partner.
          </p>

          <div className="about-highlights">
            <div className="highlight-card">
              <h3>🍫 Rich Chocolate Swirls</h3>
              <p>Delicious cocoa flavor blended into every soft layer.</p>
            </div>
            <div className="highlight-card">
              <h3>🍦 Smooth Vanilla Taste</h3>
              <p>A classic sweetness that perfectly complements the chocolate.</p>
            </div>
            <div className="highlight-card">
              <h3>🎂 Perfect for Every Occasion</h3>
              <p>From family moments to celebrations, Merbles cake always fits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;