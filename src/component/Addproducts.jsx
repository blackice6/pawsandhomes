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

      const response = await axios.post(
        "https://blackice6.alwaysdata.net/api/add_product",
        formdata
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
                <h2 className="addcake-title">Add a New Cake</h2>
                <p className="addcake-subtitle">
                  Upload your delicious cake details in style.
                </p>
              </div>

              {loading && <Loader />}

              {success && <h5 className="success-msg text-center">{success}</h5>}
              {error && <h5 className="error-msg text-center">{error}</h5>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label custom-label">Cake Name</label>
                  <input
                    type="text"
                    placeholder="Enter cake name"
                    className="form-control custom-input"
                    required
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label custom-label">Description</label>
                  <textarea
                    placeholder="Enter the cake description"
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
                    placeholder="Enter the price of the cake"
                    className="form-control custom-input"
                    required
                    value={product_cost}
                    onChange={(e) => setProductCost(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label custom-label">Cake Photo</label>
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
                  <label className="form-label custom-label">Category</label>
                  <select
                    className="form-control custom-input"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Birthday Cakes">Birthday Cakes</option>
                    <option value="Wedding Cakes">Wedding Cakes</option>
                    <option value="Chocolate Cakes">Chocolate Cakes</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Buttercream Cakes">Buttercream Cakes</option>
                    <option value="Kids Cakes">Kids Cakes</option>
                  </select>
                </div>

                <button type="submit" className="btn addcake-btn w-100">
                  Add Cake
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