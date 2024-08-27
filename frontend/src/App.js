import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import "./App.css";
import ProductList from './components/ProductList';
import Slideshow from './Slideshow';
import ContactUs from './components/ContactUs';
import aboutImage from './images/about-us.jpg';
import CartPage from './pages/CartPage';
import { CartProvider, useCart } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

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

function MainPage() {
  return (
    <>
      <Element name="home">
        <div> {/* Home section if needed */} </div>
      </Element>
      <Element name="products">
        <ProductList />
      </Element>
      <Element name="about">
        <div className="AboutUs">
          <h2>קצת עלינו</h2>
          <img src={aboutImage} alt="About Us" className="about-image" />
          <p>
            {/* About Us content */}
          </p>
        </div>
      </Element>
      <Element name="contact">
        <ContactUs />
      </Element>
      <Element name="cart">
        <CartPage />
      </Element>
    </>
  );
}

export default App;
