import './App.css';
import "./index.css"; // make sure this imports the CSS above

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

function App() {
  return (
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

      <Footer/>
    </div>
  
    </Router>
  );
}

export default App;
