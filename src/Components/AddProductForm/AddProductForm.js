import React, { useState } from 'react';
import './AddProductForm.css';

function AddProductForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Проверка заполнения полей
        if (!formData.title || !formData.price) {
            setMessage('Пожалуйста, заполните обязательные поля');
            return;
        }

        // Получаем существующие продукты
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        
        // Создаем новый продукт
        const newProduct = {
            ...formData,
            id: Date.now(),
            price: parseFloat(formData.price)
        };

        // Добавляем продукт в список
        const updatedProducts = [...existingProducts, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        // Очищаем форму
        setFormData({
            title: '',
            description: '',
            price: '',
            image: ''
        });

        setMessage('Товар успешно добавлен!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="add-product-container">
            <div className="add-product-form">
                <h2>Добавление товара</h2>
                {message && <div className={message.includes('успешно') ? 'success-message' : 'error-message'}>
                    {message}
                </div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название товара:*</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Описание:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Цена:*</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Изображение:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    {formData.image && (
                        <div className="image-preview">
                            <img src={formData.image} alt="Preview" />
                        </div>
                    )}
                    <button type="submit">Добавить товар</button>
                </form>
            </div>
        </div>
    );
}

export default AddProductForm;
