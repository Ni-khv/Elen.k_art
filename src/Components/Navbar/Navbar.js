import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
import Logo from '../img/Logo/Photoroom-20241028_142551 1 (1).png'
import Line1 from '../img/Bg/IMG_1730150606313 (7) 2 (1).png'

export default function Navbar() {
  return (
    <div>
    <nav className="navbar">
   
        <div className="nav-links">
            <a href="#" className='nav-link'>ГЛАВНАЯ</a>
            <a href="#" className='nav-link'>КАТАЛОГ</a>
        </div>
        <div className="logo">
            <a href="#">
                <img src = {Logo} alt = "logo"/>
            </a>
        </div>
        <div className="nav-links">
            <a href="#" className='nav-link'>О НАС</a>
            <a href="#" className='nav-link'>КОНТАКТЫ</a>
        </div>
    </nav>
    <div className="search-bar">
        <input type="text" placeholder="Поиск..." />
        <div className="icons">
            <a href="#"><FontAwesomeIcon icon={faSearch} /></a>
            <a href="#"><FontAwesomeIcon icon={faHeart} /></a>
            <a href="#"><FontAwesomeIcon icon={faShoppingCart} /></a>
        </div>
    </div>
</div>
  )
}
