// Import React library - base for JSX components.
import React from 'react';
// Import useCart hook from CartContext - provides cart state and actions.
import { useCart } from '../context/CartContext';
// Import useNavigate hook from react-router-dom - for programmatic navigation.
import { useNavigate } from 'react-router-dom';
// Import Cart CSS file - styles the cart modal and layout.
import '../css/Cart.css';

// Define Cart component - modal cart view with items/total/checkout.
const Cart = ({ isOpen, onClose }) => { // Props: isOpen (show/hide), onClose (close function).
  // Destructure cart state/actions from useCart hook.
  const { cartItems, cartTotal, removeFromCart } = useCart();
  // useNavigate hook instance - used for checkout navigation.
  const navigate = useNavigate();

  // handleCheckout function - navigates to payment with cart data.
  const handleCheckout = () => {
    // Navigate to makepayment passing cart and total as state.
    navigate('/makepayment', { state: { cart: cartItems, total: cartTotal } });
    // Close cart modal.
    onClose();
  };

  // If not open, return null (no render).
  if (!isOpen) return null;

  // Render cart overlay/modal.
  return (
    <div className="cart-overlay" onClick={onClose}> // Overlay backdrop, click to close.
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}> // Modal content, stop propagation.
        <div className="cart-header"> // Header section.
          <h2>Shopping Cart</h2> // Cart title.
          <button onClick={onClose}>×</button> // Close button X.
        </div>
        {cartItems.length === 0 ? ( // Conditional empty cart.
          <div className="empty-cart"> // Empty state UI.
            <p>Your cart is empty</p> // Empty message.
            <button onClick={onClose}>Continue Shopping</button> // Close button.
          </div>
        ) : ( // Cart has items.
          <>
            <div className="cart-items"> // Scrollable items list.
              {cartItems.map((item) => ( // Map each cart item.
                <div key={item.product_id} className="cart-item"> // Item row.
                  <img  // Product image.
                    src={`https://blackice6.alwaysdata.net/static/images/${item.product_photo}`}  // API image URL.
                    alt={item.product_name}  // Alt text for accessibility.
                    onError={(e) => { e.target.src = '/logo.jpg'; }} // Fallback image on error.
                  />
                  <div className="item-details"> // Item name/price.
                    <h4>{item.product_name}</h4> // Product name.
                    <p>KES {parseFloat(item.product_cost).toLocaleString()}</p> // Formatted price.
                  </div>
                  <div className="quantity-display"> // Quantity display (no buttons).
                    <span>x{item.quantity}</span> // Qty prefix x1.
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}> // Remove button.
                    Remove // Button text.
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total"> // Total section.
              <h3>Total: KES {cartTotal.toLocaleString()}</h3> // Formatted total.
              <button className="checkout-btn" onClick={handleCheckout}> // Checkout button.
                Proceed to Checkout // Button text.
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Export Cart component for use in Navbar.
export default Cart;

