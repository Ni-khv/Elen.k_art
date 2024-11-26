import React from 'react';
import './ProductCard.css';

function ProductCard({ id, title, description, price, image, onAddToCart }) {
    return (
        <div className="product-card">
            <div className="product-image">
                {image ? (
                    <img src={image} alt={title} />
                ) : (
                    <div className="no-image">Нет изображения</div>
                )}
            </div>
            <div className="product-info">
                <h3>{title}</h3>
                <p className="description">{description}</p>
                <p className="price">{price} ₽</p>
                <button onClick={() => onAddToCart()}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
}

export default ProductCard;