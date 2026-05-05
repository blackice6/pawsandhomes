// Import React with hooks - useEffect (fetch), useState (products/filter), useRef (search).
import React, { useEffect, useRef, useState } from "react";
// Import axios - API client.
import axios from "axios";
// Import CapybaraLoader - spinner.
import CapybaraLoader from "./CapybaraLoader";
// Import hooks - navigation.
import { useNavigate } from "react-router-dom";
// Import Category - filter buttons.
// import Categories from "./Category"; // Unused
// Import "../css/Getproduct.css" - products grid styling.
import "../css/Getproduct.css";
// Import FaSearch icon.
import { FaSearch } from "react-icons/fa";
// Import role util.
import { getUserRoleId } from "../utils/roleUtils.js";
import { useCart } from "../context/CartContext";
import fallbackDogImage from "../images/dogs.jpg";

// OuDogs component - full products listing (from home teasers).
const OuDogs = () => {
  // Full products array.
  const [products, setProducts] = useState([]);
  // Filtered view.
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Loading flag.
  const [loading, setLoading] = useState(false);
  // Error messages.
  const [error, setError] = useState("");

  // Search query.
  const [searchTerm, setSearchTerm] = useState("");
  // Search suggestions visibility.
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Navigation hook.
  const navigate = useNavigate();
  // Search input ref for outside clicks.
  const searchRef = useRef(null);
  // Current user/role.
  const user = JSON.parse(localStorage.getItem("user"));
const userRoleId = user ? getUserRoleId(user) : null;
const { addToCart } = useCart();

  // Image base URL.
  const img_url = "https://blackice6.alwaysdata.net/static/images/";

  // Load products on mount.
  useEffect(() => {
    const mockProducts = [
      {product_id:1, product_name:"Duke German Shepherd", product_description:"6-month-old German Shepherd, fully vaccinated, playful and loyal. Ready for active family. Includes microchip and starter kit.", product_cost:25000, product_photo:"dogs.jpg"},
      {product_id:2, product_name:"Bella Labrador", product_description:"Friendly 8-month Labrador Retriever. Great with kids, trained basics. KES 20k adoption fee.", product_cost:20000, product_photo:"dogs.jpg"},
      {product_id:3, product_name:"Max Bulldog", product_description:"2-year-old Bulldog mix, calm temperament, perfect apartment dog. All shots up to date.", product_cost:15000, product_photo:"dogs.jpg"},
      {product_id:4, product_name:"Luna Beagle", product_description:"Energetic Beagle puppy, 4 months, loves walks and adventures. Vet checked.", product_cost:18000, product_photo:"dogs.jpg"},
      {product_id:5, product_name:"Rocky Mixed Breed", product_description:"Rescue mixed breed, 1 year, super loving and adaptable. Low adoption fee.", product_cost:10000, product_photo:"dogs.jpg"},
      {product_id:6, product_name:"Sophie Poodle", product_description:"Toy Poodle female, groomed, hypoallergenic. Great companion.", product_cost:35000, product_photo:"dogs.jpg"},
      {product_id:7, product_name:"Buddy Husky", product_description:"Siberian Husky, energetic, needs space to run. Vaccinated and energetic.", product_cost:40000, product_photo:"dogs.jpg"},
      {product_id:8, product_name:"Charlie Golden Retriever", product_description:"Golden Retriever puppy, family friendly, golden heart.", product_cost:30000, product_photo:"hero-dog.jpg"},
      {product_id:9, product_name:"Zoe Boerboel", product_description:"Strong Boerboel, guard dog potential, trained.", product_cost:45000, product_photo:"ourdogs.jpg"},
      {product_id:10, product_name:"Jack Rottweiler", product_description:"Rottweiler mix, loyal protector, good with family.", product_cost:28000, product_photo:"dogs.jpg"}
    ];

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("https://blackice6.alwaysdata.net/api/get_products");
        const apiData = Array.isArray(response.data) ? response.data : [];
        setProducts(apiData.length > 0 ? apiData : mockProducts);
        setFilteredProducts(apiData.length > 0 ? apiData : mockProducts);
      } catch (err) {
        console.log("Using mock data:", err);
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setError("Using demo data.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter logic (search only, no category as backend lacks field).
  useEffect(() => {
    let filtered = [...products];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  // Search form.
  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  // Clear filters.
  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredProducts(products);
    setShowSuggestions(false);
  };

  // Select suggestion.
  const handleSelectProduct = (product) => {
    setSearchTerm(product.product_name);
    setFilteredProducts([product]);
    setShowSuggestions(false);
  };

  // Hide suggestions outside click.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dogs-page">
      <main className="dogs-main">
        <section className="dogs-hero">
          <div>
            <span className="dogs-eyebrow">Available across Kenya</span>
            <h1>Meet Your Next Puppy</h1>
            <p>
              Browse healthy puppies from trusted breeders, filter by breed, and
              find the companion that fits your home.
            </p>
          </div>

          <div className="dogs-hero-stats" aria-label="Marketplace highlights">
            <div>
              <strong>{products.length || "150+"}</strong>
              <span>Puppies Listed</span>
            </div>
            <div>
              <strong>Vet Checked</strong>
              <span>Health First</span>
            </div>
            <div>
              <strong>24hr</strong>
              <span>Buyer Support</span>
            </div>
          </div>
        </section>

        {/* Categories disabled as backend product_details lacks category field */}

        <section className="dogs-listing-panel">
          <div className="dogs-listing-header">
            <div>
              <h2>All Available Puppies</h2>
              <p>{filteredProducts.length} matches ready to explore</p>
            </div>
          </div>

          <div className="dogs-search-wrap" ref={searchRef}>
            <form className="dogs-search-form" onSubmit={handleSearch}>
              <div className="dogs-search-field">
                <span className="dogs-search-icon">
                  <FaSearch />
                </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search puppies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim() !== "" && setShowSuggestions(true)}
              />

              {showSuggestions && filteredProducts.length > 0 && (
                <div className="dogs-suggestions">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.product_id || product.id}
                      className="suggestion-item"
                      onClick={() => handleSelectProduct(product)}
                    >
                      {product.product_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="btn dogs-search-btn">
              Search
            </button>

            <button
              type="button"
              className="btn dogs-clear-btn"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </form>
        </div>

        <div className="row">

        {loading && <CapybaraLoader />}

        {error && (
          <div className="col-12">
            <h4 className="text-danger text-center">{error}</h4>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="col-12">
            <h5 className="text-center">No puppies found</h5>
          </div>
        )}

        {filteredProducts.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex" key={product.product_id || product.id}>
            <article className="dog-card w-100 h-100">
              <div className="dog-card-image-wrap">
                <img
                  src={product.product_photo ? img_url + product.product_photo : fallbackDogImage}
                  alt={product.product_name}
                  className="product_img dog-card-image"
                />
                <span className="dog-card-badge">Vaccinated</span>
              </div>

              <div className="dog-card-body">
                <h3>
                  {product.product_name}
                </h3>

                <p className="dog-card-description">
                  {product.product_description?.slice(0, 100)}...
                </p>

                <strong className="dog-price">
                  KES {product.product_cost}
                </strong>

{user && userRoleId === 4 ? (
<div className="d-flex gap-2 w-100">
                    <button
                      className="btn btn-success flex-fill"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-success flex-fill"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Purchase
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn dog-action-btn dog-action-btn-muted"
                    disabled
                    onClick={() => !user && navigate("/signin")}
                  >
                    {user ? "Customer role required" : "Sign in to purchase"}
                  </button>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
        </section>
      </main>
    </div>
  );
};

export default OuDogs;
