import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useCart } from '../CartContext'; // Adjust path if needed
import './Header.css'; // Optional: Create and add styles for Header component

function Header() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const handleScrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      smooth: true,
      duration: 600,
      offset: -120,
    });
  };

  const handleNavigation = (path, sectionName) => {
    navigate(path, { replace: true });

    setTimeout(() => {
      handleScrollToSection(sectionName);
    }, 200);
  };

  return (
    <header className="App-header">
      <div className="header-content">
        <div className="navbar">
          <Link to="/" onClick={() => handleNavigation('/', 'home')}>בית🐝</Link>
          <Link to="/" onClick={() => handleNavigation('/', 'products')}>מוצרים🍯</Link>
          <Link to="/" onClick={() => handleNavigation('/', 'about')}>קצת עלינו🌸</Link>
          <Link to="/" onClick={() => handleNavigation('/', 'contact')}>צרו קשר🧇</Link>
          <Link to="/cart" className="cart-link">
            עגלה🛒
            <span className="cart-count">{getCartCount()}</span>
          </Link>
        </div>
        <h1 className="header-title">דבש האילן</h1>
      </div>
    </header>
  );
}

export default Header;
