import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CapybaraLoader from './CapybaraLoader';

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const navigate = useNavigate();
  const img_url = "https://blackice6.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost);

      const response = await axios.post(
        "https://blackice6.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div 
      className="container py-5" 
      style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
<h1 className="text-primary">🐕 Adopt via M-PESA</h1>
            <button 
              className="btn btn-outline-light" 
              onClick={() => navigate("/")}
            >
              &larr; Back
            </button>
          </div>

          <div className="card shadow-lg" style={{ backgroundColor: '#1e1e1e' }}>
            <img 
              src={img_url + product.product_photo} 
              alt={product.product_name} 
              className="card-img-top" 
              style={{ objectFit: 'cover', maxHeight: '300px' }}
            />
            <div className="card-body">
              <h2 className="text-info">{product.product_name}</h2>
              <p className="text-light">{product.product_description}</p>
              <h3 className="text-warning mb-4">KES {product.product_cost}</h3>

              <form onSubmit={handlesubmit}>
{loading && <CapybaraLoader />}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <input
                  type="tel"
                  className="form-control mb-3"
                  placeholder="Enter Phone Number 254xxxxxxxxx"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  style={{
                    backgroundColor: '#706666',
                    color: '#f1dfdf',
                    border: '1px solid #444',
                  }}
                />

<button 
                  type="submit" 
                  className="btn btn-success w-100"
                  style={{ fontWeight: 'bold' }}
                >
                  Adopt Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;