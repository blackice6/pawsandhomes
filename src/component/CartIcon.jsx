import React from 'react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const CartIcon = () => {
  React.useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);


  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <>
      <button 
        className="cart-icon-btn" 
        onClick={() => setIsCartOpen(true)}
        title="Cart"
      >
        🛒
        {cartItems.length > 0 && (
          <span className="cart-badge">{cartItems.length}</span>
        )}
      </button>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default CartIcon;

