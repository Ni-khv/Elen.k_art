import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AddProductForm from './Components/AddProductForm/AddProductForm';
import ProductGrid from './Components/ProductGrid/ProductGrid';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setIsAuthenticated(true);
      setIsAdmin(currentUser.role === 'admin');
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <div className="App">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        isAdmin={isAdmin} 
        onLogout={handleLogout}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
      />
      <Routes>
        <Route path="/" element={<ProductGrid addToCart={addToCart} />} />
        <Route 
          path="/login" 
          element={
            <AdminLogin 
              setIsAuthenticated={setIsAuthenticated}
              setIsAdmin={setIsAdmin} 
            />
          } 
        />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/admin/add-product" 
          element={
            isAdmin ? (
              <AddProductForm />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? (
              <Profile onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;