
import React, { useState } from 'react';
import './AddProductForm.css';

function AddProductForm({ onAddProduct }) {
  
  const [newProduct, setNewProduct] = useState({
    image: '',
    title: '',
    description: '',
    price: ''
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: imageURL,
      }));
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct); 
    setNewProduct({
      image: '',
      title: '',
      description: '',
      price: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Название товара"
        value={newProduct.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Описание товара"
        value={newProduct.description}
        onChange={handleInputChange}
      ></textarea>
      <input
        type="text"
        name="price"
        placeholder="Цена товара"
        value={newProduct.price}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Добавить товар</button>
    </form>
  );
}

export default AddProductForm;
