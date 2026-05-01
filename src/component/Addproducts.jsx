import React, { useState, useRef } from "react";
import Loader from "./Loader";
import axios from "axios";
import "../css/Addproducts.css";

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);
      formdata.append("category", category);

      const user = JSON.parse(localStorage.getItem("user"));
      formdata.append("user_id", user.user_id);
      const token = user?.auth_token || user?.token;

      const response = await axios.post(
        "https://blackice6.alwaysdata.net/api/add_product",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setSuccess(response.data.message);

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      setCategory("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="addcake-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="addcake-card shadow-lg">
<div className="text-center mb-4">
                <h2 className="addcake-title">Add a New Puppy</h2>
                <p className="addcake-subtitle">
                  Add your adorable puppy details to the website.
                </p>
              </div>

              {loading && <Loader />}

              {success && <h5 className="success-msg text-center">{success}</h5>}
              {error && <h5 className="error-msg text-center">{error}</h5>}

              <form onSubmit={handleSubmit}>
<div className="mb-3">
                  <label className="form-label custom-label">Puppy Name</label>
                  <input
                    type="text"
                    placeholder="Enter puppy name"
                    className="form-control custom-input"
                    required
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

<div className="mb-3">
                  <label className="form-label custom-label">Description</label>
                  <textarea
                    placeholder="Enter the puppy description"
                    className="form-control custom-input"
                    rows="4"
                    required
                    value={product_description}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label custom-label">Price (KES)</label>
                  <input
                    type="number"
                    placeholder="Enter the price of the puppy"
                    className="form-control custom-input"
                    required
                    value={product_cost}
                    onChange={(e) => setProductCost(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label custom-label">Dog Photo</label>
                  <input
                    type="file"
                    className="form-control custom-file"
                    required
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setProductPhoto(e.target.files[0])}
                  />
                </div>

<div className="mb-3">
                  <label className="form-label custom-label">Breed</label>
                  <select
                    className="form-control custom-input"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Breed</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="German Shepherd">German Shepherd</option>
                    <option value="Labrador">Labrador</option>
                    <option value="Bulldog">Bulldog</option>
                    <option value="Beagle">Beagle</option>
                    <option value="Poodle">Poodle</option>
                    <option value="Husky">Husky</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button type="submit" className="btn addcake-btn w-100">
                  Add Puppy
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproducts;