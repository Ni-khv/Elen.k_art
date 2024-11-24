import React, { useState, useEffect } from 'react';
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ProductCard from "./Components/ProductCard/ProductCard";
import AddProductForm from "./Components/AddProductForm/AddProductForm"
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus) {
      setIsAdmin(true);
    }
    // Загружаем сохраненные товары при запуске
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAdmin) {
      return <Navigate to="/admin" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                  />
                ))}
              </div>
            } />
            <Route path="/admin" element={<AdminLogin onLogin={setIsAdmin} />} />
            <Route 
              path="/admin/add-product" 
              element={
                <ProtectedRoute>
                  <AddProductForm onAddProduct={handleAddProduct} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;