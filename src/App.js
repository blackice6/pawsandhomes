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
import { CartProvider } from './context/CartContext';

import Cart from './component/Cart';
import PawsBot from "./component/PawsBot";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [csv, setCsv] = useState("");

  useEffect(() => {
    fetch("/pawsbot_responses.csv")
      .then(r => r.text())
      .then(setCsv);
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
        </div>
      </Router>
      <PawsBot csvText={csv} floating={true} />
    </CartProvider>
  );
}

export default App;

