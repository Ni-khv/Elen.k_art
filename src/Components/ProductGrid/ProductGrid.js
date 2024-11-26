import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

function ProductGrid({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Загружаем сохраненные товары при запуске
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    if (products.length === 0) {
        return (
            <div className="empty-products">
                <h2>Товары пока не добавлены</h2>
                <p>Администратор скоро добавит новые товары</p>
            </div>
        );
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => addToCart(product)}
                />
            ))}
        </div>
    );
}

export default ProductGrid;
