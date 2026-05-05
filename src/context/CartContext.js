// Import React core features - createContext for context, useContext for consuming, useReducer for state machine, useEffect for side effects.
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create CartContext - context object for sharing cart state app-wide.
const CartContext = createContext();

// cartReducer function - handles cart state updates based on action type.
const cartReducer = (state, action) => {
  // Switch on action type to determine state change.
  switch (action.type) {
    // Case ADD_ITEM - add product to cart.
    case 'ADD_ITEM':
      // Check if product already in cart by product_id.
      const existingItem = state.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        // Do not add duplicate, just notify or ignore.
        return state;
      }
      // Add as new item with quantity 1.
      return [...state, { ...action.payload, quantity: 1 }]; 
    // Case UPDATE_QTY - change item quantity.
    case 'UPDATE_QTY':
      // Map and update matching product_id quantity.
      return state.map(item =>
        item.product_id === action.payload.product_id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) } // Ensure min qty 1.
          : item
      );
    // Case REMOVE_ITEM - delete item from cart.
    case 'REMOVE_ITEM':
      // Filter out matching product_id.
      return state.filter(item => item.product_id !== action.payload.product_id);
    // Case CLEAR_CART - empty cart.
    case 'CLEAR_CART':
      return []; // Return empty array.
    // Case SET_CART - set cart from localStorage.
    case 'SET_CART':
      return action.payload; // Return new array.
    // Default case - no change.
    default:
      return state;
  }
};

// useCart hook - consumes CartContext for components.
export const useCart = () => {
  // Get context value.
  const context = useContext(CartContext);
  // Throw error if used outside Provider.
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component - wraps app, provides cart state.
export const CartProvider = ({ children }) => {
  // useReducer with cartReducer and empty initial state.
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Calculate total price - sum (price * qty).
  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.product_cost) || 0; // Parse price, default 0.
    return total + (price * item.quantity);
  }, 0); // Initial total 0.

  // useEffect - load cart from localStorage on mount.
  useEffect(() => {
    // Get saved cart from localStorage.
    const saved = localStorage.getItem('cart');
    if (saved) {
      // Dispatch SET_CART with parsed data.
      dispatch({ type: 'SET_CART', payload: JSON.parse(saved) });
    }
  }, []); // Empty deps - run once.

  // useEffect - save cart to localStorage when cartItems change.
  useEffect(() => {
    // Stringify and save cartItems.
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]); // Deps: cartItems.

  // addToCart function - dispatches ADD_ITEM.
  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  // updateQuantity function - dispatches UPDATE_QTY.
  const updateQuantity = (product_id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { product_id, quantity } });
  // removeFromCart function - dispatches REMOVE_ITEM.
  const removeFromCart = (product_id) => dispatch({ type: 'REMOVE_ITEM', payload: { product_id } });
  // clearCart function - dispatches CLEAR_CART.
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  // Render Provider with value.
  return (
    <CartContext.Provider value={{
      // Cart items array.
      cartItems,
      // Total price.
      cartTotal,
      // Add function.
      addToCart,
      // Qty update function.
      updateQuantity,
      // Remove function.
      removeFromCart,
      // Clear function.
      clearCart
    }}>
      {children} // Wrap children components.
    </CartContext.Provider>
  );
};

