import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Logo from '../img/Logo/Photoroom-20241028_142551 1 (1).png';

function Navbar({ cartItemsCount = 0, isAuthenticated, isAdmin, onLogout }) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="nav-links">
                    <Link to="/" className="nav-link">ГЛАВНАЯ</Link>
                    <Link to="/" className="nav-link">КАТАЛОГ</Link>
                </div>
            </div>

            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="logo" />
                </Link>
            </div>

            <div className="nav-center">
                <div className="nav-links">
                    <Link to="/" className="nav-link">О НАС</Link>
                    <Link to="/" className="nav-link">КОНТАКТЫ</Link>
                </div>
            </div>

            <div className="nav-right">
                <div className="search-bar">
                    <input type="text" placeholder="Поиск..." />
                    <div className="icons">
                        <Link to="/"><FontAwesomeIcon icon={faSearch} /></Link>
                        <Link to="/"><FontAwesomeIcon icon={faHeart} /></Link>
                        <Link to="/cart" className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItemsCount > 0 && (
                                <span className="cart-count">{cartItemsCount}</span>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="auth-section">
                    {isAuthenticated ? (
                        <div className="auth-links">
                            <Link to="/profile" className="admin-icon">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                            {isAdmin && (
                                <Link to="/admin/add-product" className="nav-link">
                                    ДОБАВИТЬ ТОВАР
                                </Link>
                            )}
                            <button onClick={onLogout} className="logout-button">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="admin-icon">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;