
import React, { useState } from 'react';
import './AddProductForm.css';

function AddProductForm({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    image: '',
    title: '',
    description: '',
    price: ''
  });

  const [message, setMessage] = useState('');
  
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setMessage('Товар успешно добавлен!');
    
    // Очищаем форму
    setNewProduct({
      image: '',
      title: '',
      description: '',
      price: ''
    });
    
    // Очищаем сообщение через 3 секунды
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="add-product-container">
      <h2>Добавление нового товара</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Изображение:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Название товара:</label>
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Описание:</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>Цена:</label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit">Добавить товар</button>
      </form>
      
      {message && <div className="success-message">{message}</div>}
    </div>
  );
}

export default AddProductForm;
