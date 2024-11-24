import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
import Logo from '../img/Logo/Photoroom-20241028_142551 1 (1).png'
import Line1 from '../img/Bg/IMG_1730150606313 (7) 2 (1).png'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
            <Link to="/" className='nav-link'>ГЛАВНАЯ</Link>
            <Link to="/" className='nav-link'>КАТАЛОГ</Link>
        </div>
        <div className="logo">
            <Link to="/">
                <img src={Logo} alt="logo"/>
            </Link>
        </div>
        <div className="nav-links">
            <Link to="/" className='nav-link'>О НАС</Link>
            <Link to="/" className='nav-link'>КОНТАКТЫ</Link>
            <Link to="/admin" className='nav-link'>АДМИН</Link>
        </div>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Поиск..." />
        <div className="icons">
            <Link to="/"><FontAwesomeIcon icon={faSearch} /></Link>
            <Link to="/"><FontAwesomeIcon icon={faHeart} /></Link>
            <Link to="/"><FontAwesomeIcon icon={faShoppingCart} /></Link>
        </div>
      </div>
    </div>
  )
}