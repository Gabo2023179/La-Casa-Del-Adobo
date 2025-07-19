import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import Contacto from './components/Contacto';
import Promociones from './components/Promociones';
import Header from './components/Header';
import Navbar from './components/Navbar'; 
import About from './components/About';
import FAQs from './components/FAQs';
import AddProduct from './components/AddProduct'; 
import AddPromociones from './components/AddPromociones'; 
import AddHome from './components/AddHome'; 
import Car from './components/Cart';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel'; // Importar AdminPanel
import AddBox from './components/AddBox'; // Importar AddBox
import BoxMenu from './components/BoxMenu'; // Importar BoxMenu
import VerMensajes from './components/VerMensajes'; // Importar BoxMenu
import Servicios from './components/Servicios'; // Importar BoxMenu


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/boxmenu" element={<BoxMenu />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Servicios />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Message" 
              element={
                <ProtectedRoute>
                  <VerMensajes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/addproduct" 
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/addpromociones" 
              element={
                <ProtectedRoute>
                  <AddPromociones />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/addhome" 
              element={
                <ProtectedRoute>
                  <AddHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/addbox" 
              element={
                <ProtectedRoute>
                  <AddBox />
                </ProtectedRoute>
              } 
            />
            <Route path="/cart" element={<Car />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
