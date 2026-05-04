// Import React library with specific hooks: useEffect for side effects (cleanup), useState for managing component state.
import React, { useEffect, useState } from "react";
// Import axios library for making HTTP requests to the backend API endpoints.
import axios from "axios";
// Import Link component from react-router-dom for client-side navigation without full page reloads.
import { Link } from "react-router-dom";
// Import CapybaraLoader component from local directory - custom animated loading spinner shown during async operations.
import CapybaraLoader from "./CapybaraLoader";
// Import the CSS file containing all styles for this component (studio layout, preview pane, neon effects).
import "../css/Addproducts.css";

// Define the main AddProducts functional component - handles puppy/product listing creation with live preview.
const AddProducts = () => {
  // useState hook initializes product_name state with empty string - stores user-typed puppy name from form input.
  const [product_name, setProductName] = useState("");
  // useState hook initializes product_description state - stores detailed description text entered by user.
  const [product_description, setProductDescription] = useState("");
  // useState hook initializes product_cost state as empty string - stores numerical adoption/price value.
  const [product_cost, setProductCost] = useState("");
  // useState hook initializes product_photo state as null - stores File object from image input for upload.
  const [product_photo, setProductPhoto] = useState(null);
  // useState hook initializes previewUrl state as null - stores temporary browser URL for image preview (URL.createObjectURL).
  const [previewUrl, setPreviewUrl] = useState(null);
  // useState hook initializes loading state as false - boolean flag toggled during form submission to show/hide loader.
  const [loading, setLoading] = useState(false);
  // useState hook initializes success state as empty string - displays backend success message after upload.
  const [success, setSuccess] = useState("");
  // useState hook initializes error state as empty string - displays error messages from API failures.
  const [error, setError] = useState("");

  // useEffect hook runs on previewUrl change or unmount - cleanup function prevents memory leaks from object URLs.
  useEffect(() => {
    // Return cleanup function that runs on unmount or before next effect.
    return () => {
      // Check if previewUrl exists before attempting to revoke (avoids errors).
      if (previewUrl) {
        // RevokeObjectURL releases memory used by temporary blob URL created for image preview.
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]); // Dependency array: re-run effect only when previewUrl changes.

  // handleImageChange function triggered by onChange of file input - processes selected image file.
  const handleImageChange = (event) => {
    // Extract first (and only) selected file from FileList object (event.target.files).
    const file = event.target.files[0];

    // Early return if no file selected (user clicked cancel/browse without choosing).
    if (!file) {
      return;
    }

    // Cleanup: revoke previous preview URL if one exists to free memory.
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Update state with selected File object - will be appended to FormData for upload.
    setProductPhoto(file);
    // Generate temporary browser-readable URL for immediate image preview (no server roundtrip).
    setPreviewUrl(URL.createObjectURL(file));
  };

  // handleSubmit async function triggered by form onSubmit - handles full product creation flow.
  const handleSubmit = async (event) => {
    // preventDefault stops browser default form submission (page reload).
    event.preventDefault();
    // Set loading true to show spinner and disable submit button during API call.
    setLoading(true);
    // Clear previous error message for clean UI state.
    setError("");
    // Clear previous success message before new submission.
    setSuccess("");

    try {
      // FormData object for multipart/form-data - required for file uploads (images).
      const formdata = new FormData();
      // Append name field - matches backend API expectation.
      formdata.append("product_name", product_name);
      // Append description field - full text details.
      formdata.append("product_description", product_description);
      // Append cost field - parsed as number on backend.
      formdata.append("product_cost", product_cost);
      // Append image file - key matches backend file handling.
      formdata.append("product_photo", product_photo);

      // axios.post sends FormData to backend - no Content-Type header (browser sets multipart automatically).
      const response = await axios.post("https://blackice6.alwaysdata.net/api/add_product", formdata);

      // Update success state with API response message or fallback text.
      setSuccess(response.data.message || "Puppy successfully listed.");
      // Reset form fields on success for next entry.
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);
      setPreviewUrl(null);
    } catch (err) {
      // Extract error from axios response or use generic message.
      setError(err.response?.data?.message || "Error connecting to server.");
    } finally {
      // Always stop loading state (success or error) to re-enable form.
      setLoading(false);
    }
  };

  // return JSX - renders the entire AddProducts UI.
  return (
    // Root div with utility classes for full viewport height, padding, dark theme.
    <div className="page-container dark-mode min-vh-100 py-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Bootstrap container centers content horizontally with max-width. */}
      <div className="container">
        {/* Back link container with margin-bottom for spacing. */}
        <div className="mb-4">
          {/* Link to home route with neon-styled text and no underline. */}
          <Link to="/" className="text-decoration-none small fw-bold text-neon">
            ← Back Home
          </Link>
        </div>

        {/* Studio card layout using Bootstrap row/grid with no gutters. */}
        <div className="studio-card row g-0">
          {/* Left column (7/12 width on lg screens) - form inputs. */}
          <div className="col-lg-7 p-4 p-md-5">
            {/* Main heading with neon gradient text effect. */}
            <h2 className="fw-bold mb-2 text-neon">
              Create <span style={{ color: "#00d4ff" }}>Listing</span>
            </h2>
            {/* Subtitle explaining feature (live preview). */}
            <p className="text-muted mb-4">Add your puppy with a live preview.</p>

            {/* Conditional loader render during submission. */}
            {loading && (
              <div className="mb-3">
                {/* CapybaraLoader shows animated spinner. */}
                <CapybaraLoader />
              </div>
            )}
            {/* Success alert with Bootstrap styling. */}
            {success && <div className="alert alert-success border-0 rounded-4 mb-4">{success}</div>}
            {/* Error alert with Bootstrap styling. */}
            {error && <div className="alert alert-danger border-0 rounded-4 mb-4">{error}</div>}

            {/* Main form element with onSubmit handler. */}
            <form onSubmit={handleSubmit}>
              {/* Puppy name input group. */}
              <div className="mb-4">
                {/* Label with step number badge and uppercase text. */}
                <label className="fw-bold small text-uppercase mb-2 d-flex align-items-center text-muted">
                  <span className="step-number">1</span>
                  Puppy Name
                </label>
                {/* Text input with controlled value and custom styling class. */}
                <input
                  type="text"
                  className="form-control studio-input"
                  placeholder="e.g. Duke of Windsor"
                  value={product_name}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                />
              </div>

              {/* Bootstrap row for side-by-side cost/image inputs. */}
              <div className="row mb-4">
                {/* Cost input - left column on md+. */}
                <div className="col-md-6 mb-4 mb-md-0">
                  <label className="fw-bold small text-uppercase mb-2 d-flex align-items-center text-muted">
                    <span className="step-number">2</span>
                    Adoption Fee
                  </label>
                  <input
                    type="number"
                    className="form-control studio-input"
                    placeholder="KES"
                    value={product_cost}
                    onChange={(event) => setProductCost(event.target.value)}
                    min="0"
                    required
                  />
                </div>

                {/* Image file input - right column on md+. */}
                <div className="col-md-6">
                  <label className="fw-bold small text-uppercase mb-2 d-flex align-items-center text-muted">
                    <span className="step-number">3</span>
                    Puppy Image
                  </label>
                  <input
                    type="file"
                    className="form-control studio-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </div>

              {/* Description textarea group. */}
              <div className="mb-5">
                <label className="fw-bold small text-uppercase mb-2 d-flex align-items-center text-muted">
                  <span className="step-number">4</span>
                  Dog Details
                </label>
                <textarea
                  className="form-control studio-input"
                  rows="4"
                  placeholder="Personality, health, and spirit..."
                  value={product_description}
                  onChange={(event) => setProductDescription(event.target.value)}
                  required
                ></textarea>
              </div>

              {/* Primary submit button - disabled during loading, dynamic text. */}
              <button type="submit" disabled={loading} className="btn btn-modern btn-primary-neon btn-lg w-100 rounded-pill py-3 fw-bold">
                {loading ? "Publishing..." : "Publish"}
              </button>
            </form>
          </div>

          {/* Right preview column - hidden on small screens (d-none d-lg-flex). */}
          <div className="col-lg-5 preview-pane d-none d-lg-flex align-items-center justify-content-center">
            <div className="text-center p-4">
              {/* Preview section heading with uppercase/neon styling. */}
              <h6 className="text-neon mb-4 text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>
                Live Preview
              </h6>

              {/* Interactive preview card mimicking final product card. */}
              <div className="card-modern shadow-lg" style={{ width: "320px", borderRadius: "16px", overflow: "hidden" }}>
                {/* Product image - uses previewUrl or fallback public image. */}
                <img
                  src={previewUrl || `${process.env.PUBLIC_URL}/images/dogs.jpg`}
                  style={{ height: "220px", objectFit: "cover" }}
                  className="glow-effect"
                  alt="Preview"
                />
                {/* Card content with live data binding. */}
                <div className="p-4">
                  {/* Dynamic title fallback to "Pet Name". */}
                  <h5 className="fw-bold mb-1 text-white">{product_name || "Pet Name"}</h5>
                  {/* Truncated description preview (70 chars). */}
                  <p className="text-muted small mb-3">
                    {product_description
                      ? `${product_description.slice(0, 70)}${product_description.length > 70 ? "..." : ""}`
                      : "Personality, health, and spirit will appear here."}
                  </p>
                  {/* Formatted price with locale string (thousands separator). */}
                  <p className="text-neon fw-bold mb-0">KES {Number(product_cost || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export default makes this component available for import in App.js routes.
export default AddProducts;
