import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/makepayment', { state: { cart: cartItems, total: cartTotal } });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button onClick={onClose}>×</button>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.product_id} className="cart-item">
                  <img
                    src={`https://blackice6.alwaysdata.net/static/images/${item.product_photo}`}
                    alt={item.product_name}
                    onError={(e) => { e.target.src = '/logo.jpg'; }}
                  />
                  <div className="item-details">
                    <h4>{item.product_name}</h4>
                    <p>KES {parseFloat(item.product_cost).toLocaleString()}</p>
                  </div>
                  <div className="quantity-display">
                    <span>x{item.quantity}</span>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total: KES {cartTotal.toLocaleString()}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

