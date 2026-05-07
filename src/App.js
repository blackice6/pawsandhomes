import './App.css';
import "./index.css";

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signin from './component/Signin';
import Signup from './component/Signup';
import Addproducts from './component/Addproducts';
import Home from './component/Home';
import OuDogs from './component/OuDogs';
import Makepayment from './component/Makepayment';
import Notfound from './component/Notfound';
import Navbar from './component/Navbar';
import About from './component/Aboutus';
import Contact from './component/Contact';
import AdminRoute from './component/AdminRoute';
import Footer from './component/Footer';
import { CartProvider, useCart } from './context/CartContext';

import Cart from './component/Cart';
import PawsBot from "./component/PawsBot";

function FloatingCart() {
  const { cartItems } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const userRoleId = user ? user.role_id : null;
  const isCustomer = userRoleId === 4;

  if (!isCustomer) return null;

  return (
    <button
      className="floating-cart-btn"
      onClick={() => window.dispatchEvent(new CustomEvent('openCart'))}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      🛒
      {cartItems.length > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          {cartItems.length}
        </span>
      )}
    </button>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [csv, setCsv] = useState("");

  useEffect(() => {
    fetch("/pawsbot_responses.csv")
      .then(r => r.text())
      .then(setCsv);
  }, []);

  // Listen for cart open event from Navbar
  useEffect(() => {
    const handleOpenCart = () => {
      setIsCartOpen(true);
    };
    window.addEventListener('openCart', handleOpenCart);
    return () => {
      window.removeEventListener('openCart', handleOpenCart);
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ourdogs' element={<OuDogs />} />
            <Route
              path='/addproducts'
              element={<AdminRoute allowedRoles={["administrator", "distributer"]}><Addproducts /></AdminRoute>}
            />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route
              path='/makepayment'
              element={<Makepayment />}
            />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<Notfound />} />
          </Routes>

          <Footer />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <PawsBot csvText={csv} floating={true} />
          <FloatingCart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

