// Import React library with hooks: useEffect (data fetching), useState (local state).

// Import axios - HTTP client for API calls (stats/trust data if dynamic).

// Import React hooks for component state.
import { useState } from "react";
// Import useNavigate - programmatic routing to ourdogs/addproducts.
import { useNavigate } from "react-router-dom";
// Import CapybaraLoader - animated loading spinner.
import CapybaraLoader from "./CapybaraLoader";

import "../css/Home.css";
import heroImage from "../images/hero-dog.jpg";


// Hero stats array - displayed as animated counters.
const HERO_STATS = [
  { value: "5,000+", label: "Puppies Rehomed" },
  { value: "50-100", label: "Dogs Available" },
  { value: "98%", label: "Success Rate" },
  { value: "+254 729 932 162", label: "Contact" }
];

// Trust features grid - 3 key selling points.
const TRUST_FEATURES = [
  {
    badge: "VB",
    title: "Verified Breeders",
    description: "Every breeder in Kenya is screened and visited to ensure ethical standards.",
  },
  {
    badge: "HG",
    title: "Health Guarantee",
    description: "All puppies come with a vet-signed health check and initial vaccinations.",
  },
  {
    badge: "KE",
    title: "Local Support",
    description: "Based in Nairobi, providing expert guidance for your puppy's new life.",
  },
];

// Size/price filters config - CTA to ourdogs page.
const SIZE_FILTERS = ["All", "Budget", "Standard", "Premium"];

// Breed labels for demos.
const BREED_LABELS = ["German Shepherd", "Boerboel", "Golden Retriever", "Rotweiller", "Local Mix"];

// Home component - landing page with hero/marketing, no products list (redirects to /ourdogs).
const Home = () => {
  // activeFilter state - price filter demo.
  const [activeFilter, setActiveFilter] = useState("All");
  const loading = false;
  const error = "";

  // navigate instance - routing.
  const navigate = useNavigate();

  const dogs = [
    {product_id:1, product_name:"Duke German Shepherd", product_description:"6-month-old German Shepherd, fully vaccinated, playful and loyal.", product_cost:25000, product_photo:"/dog1.jpg"},
    {product_id:2, product_name:"Bella Labrador", product_description:"Friendly 8-month Labrador Retriever. Great with kids.", product_cost:20000, product_photo:"/dog2.jpg"},
    {product_id:3, product_name:"Max Bulldog", product_description:"2-year-old Bulldog mix, calm temperament.", product_cost:15000, product_photo:"/dog3.jpg"},
    {product_id:4, product_name:"Luna Beagle", product_description:"Energetic Beagle puppy, 4 months, loves walks.", product_cost:18000, product_photo:"/dog4.jpg"},
    {product_id:8, product_name:"Charlie Golden Retriever", product_description:"Golden Retriever puppy, family friendly.", product_cost:30000, product_photo:"/dog1.jpg"}
  ];


  // Filter logic for hero teasers (KES price-based).
  const filteredDogs = dogs.filter((dog) => {
    const price = Number(dog.product_cost || 0);
    if (activeFilter === "All") return true;
    if (activeFilter === "Budget") return price < 20000;
    if (activeFilter === "Standard") return price >= 20000 && price < 30000;
    return price >= 30000;
  });


  // Location labels for teasers.
  const getDogLocationLabel = (index) => {
    const locations = ["Karen, Nairobi", "Nyali, Mombasa", "Runda, Nairobi", "Milimani, Kisumu", "Eldoret"];
    return locations[index % locations.length];
  };

  // Short desc for teasers.
  const getShortDescription = (dog) => {
    const text = dog.product_description || "A playful and healthy puppy looking for a home.";
    return text.split(" ").slice(0, 8).join(" ") + "...";
  };

  // CTA to full products page.
  const scrollToArrivals = () => {
    const arrivals = document.getElementById("arrivals");
    arrivals?.scrollIntoView({ behavior: "smooth" });
  };

  // return JSX - full home/landing page.
  return (
    <div className="reference-page">
      {/* Main content. */}
      <main className="reference-main">
        <div className="reference-container">
          {/* Hero section - split layout text/image. */}
          <section className="reference-hero">
            {/* Left text column. */}
            <div className="reference-hero-copy">
              {/* Eyebrow text. */}
              <span className="reference-eyebrow">Kenya's Most Trusted Pet Marketplace</span>
              {/* Main headline with accent span. */}
              <h1 className="reference-hero-title">
                Find your new <span className="reference-hero-accent">best friend</span>
              </h1>
              {/* Hero subtitle. */}
              <p className="reference-hero-text">
                Connecting Kenyan families with healthy, vaccinated, and ethically bred puppies.
              </p>

              {/* Dual CTA buttons. */}
              <div className="reference-hero-actions">
                {/* Primary - scroll to arrivals teasers. */}
                <button className="reference-primary-button" onClick={scrollToArrivals}>
                  View Available Puppies
                </button>
                {/* Secondary - to addproducts (breeder signup). */}
                <button className="reference-secondary-button" onClick={() => navigate("/addproducts")}>
                  Register as Breeder
                </button>
              </div>

              {/* Stats grid. */}
              <div className="reference-stats">
                {HERO_STATS.map((stat, index) => (
                  <div key={stat.label} className="reference-stat">
                    {/* Stat value. */}
                    <h3>{stat.value}</h3>
                    {/* Stat label. */}
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual column. */}
            <div className="reference-hero-visual">
              <div className="reference-hero-image-shell">
                {/* Hero image. */}
                <img src={heroImage} alt="Puppy" className="reference-hero-image" />
                {/* Testimonial quote card. */}
                <div className="reference-quote-card">
                  <p>"Found our perfect puppy"</p>
                  <small>The Kamau Family, Nairobi</small>
                </div>
              </div>
            </div>
          </section>

          {/* Trust features grid. */}
          <section className="reference-feature-grid">
            {TRUST_FEATURES.map((feature, index) => (
              <article key={feature.title} className="reference-feature-card">
                {/* Feature badge. */}
                <div className="reference-feature-badge">{feature.badge}</div>
                {/* Feature title. */}
                <h3>{feature.title}</h3>
                {/* Feature description. */}
                <p>{feature.description}</p>
              </article>
            ))}
          </section>
        </div>

        {/* New arrivals teasers section (no full grid). */}
        <section id="arrivals" className="reference-arrivals py-5">
          <div className="reference-container">
            {/* Arrivals header. */}
            <div className="reference-arrivals-header text-center mb-5">
              <h2>New Arrivals in Kenya</h2>
              {/* Filter bar demo (click to ourdogs full page). */}
              <div className="reference-filter-bar d-flex justify-content-center gap-2 mt-4">
                {SIZE_FILTERS.map((filter) => (
                  <button key={filter} className={`reference-filter-pill ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Loader if fetching. */}
            {loading && <CapybaraLoader />}

            {error && !loading && <p className="reference-arrivals-note">{error}</p>}

            {/* Featured teasers (first 4 filtered). */}
            {!loading && (
              <div className="reference-product-grid">
                {filteredDogs.slice(0, 4).map((dog, index) => (
                  <article className="reference-product-card" key={dog.product_id || index}>
                    {/* Image wrapper. */}
                    <div className="reference-product-image-wrap">
                      <img 
                        src={dog.product_photo} 
                        className="reference-product-image" 
                        alt={dog.product_name} 
                      />

                    </div>
                    {/* Card body. */}
                    <div className="reference-product-body p-3">
                      {/* Header row. */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        {/* Name + breed. */}
                        <div>
                          <h3 className="reference-product-name mb-0">{dog.product_name}</h3>
                          <p className="reference-product-breed">{BREED_LABELS[index % BREED_LABELS.length]}</p>
                        </div>
                        {/* Price. */}
                        <strong className="text-success">KES {Number(dog.product_cost).toLocaleString()}</strong>
                      </div>
                      {/* Short description. */}
                      <p className="reference-product-description">{getShortDescription(dog)}</p>
                      {/* Badges. */}
                      <div className="d-flex gap-2 mb-3">
                        <span className="badge bg-light text-dark border">Vaccinated</span>
                        <span className="badge bg-light text-dark border">{getDogLocationLabel(index)}</span>
                      </div>
                      {/* Adopt CTA - to full ourdogs. */}
                      <button className="reference-adopt-button w-100 py-2" onClick={() => navigate("/ourdogs")}>
                        View All Puppies
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* View more CTA to ourdogs. */}
            <div className="text-center mt-5">
              <button className="btn btn-outline-primary px-5" onClick={() => navigate("/ourdogs")}>
                View All Puppies
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Export for App.js routing.
export default Home;
