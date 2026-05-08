import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CapybaraLoader from './CapybaraLoader';

const Makepayment = () => {
const location = useLocation();
const state = location.state || {};
const { cart, product } = state;
  const navigate = useNavigate();
  const img_url = "https://blackice6.alwaysdata.net/static/images/";
  const total = cart ? cart.reduce((sum, item) => sum + parseFloat(item.product_cost) * item.quantity, 0) : parseFloat(product ? product.product_cost : 0);
  const isCart = cart && cart.length > 0;
  const checkoutTitle = isCart ? 'Cart Checkout' : (product ? product.product_name : 'Checkout');
  const checkoutDesc = isCart ? 'Total for cart items' : (product ? product.product_description : 'Complete your payment');

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
formdata.append("amount", total.toFixed(0));

      const response = await axios.post(
        "https://kbenkamotho.alwaysdata.net/api/mpesa_payment",
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
<h1 className="text-primary">🐕 {checkoutTitle} via M-PESA</h1>
            <button 
              className="btn btn-outline-light" 
              onClick={() => navigate("/")}
            >
              &larr; Back
            </button>
          </div>

          <div className="card shadow-lg" style={{ backgroundColor: '#1e1e1e' }}>
            {product && !isCart && (
              <img 
                src={img_url + product.product_photo} 
                alt={product.product_name} 
                className="card-img-top" 
                style={{ objectFit: 'cover', maxHeight: '300px' }}
              />
            )}
            {isCart && (
              <div className="p-3 text-center">
                <span className="fs-1">🛒</span>
              </div>
            )}
            <div className="card-body">
              <h2 className="text-info">{checkoutTitle}</h2>
              <p className="text-light">{checkoutDesc}</p>
              <h3 className="text-warning mb-4">KES {total.toLocaleString()}</h3>

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
