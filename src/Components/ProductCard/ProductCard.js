import React from 'react';
import './ProductCard.css';

function ProductCard({ image, title, description, price }) {
  return (
    <div className="product-card">
      {image ? (
        <img src={image} alt={title} className="product-image" />
      ) : (
        <div className="image-placeholder">📷</div>
      )}
      <div className="product-info">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <div className="price">{price}</div>
        <button className="add-to-cart">Добавить в корзину</button>
      </div>
    </div>
  );
}

export default ProductCard;