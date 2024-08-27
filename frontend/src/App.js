import React from "react";
import { Link, Element } from 'react-scroll';
import "./App.css";
import ProductList from "./components/ProductList";
import Slideshow from "./Slideshow"; // Import the Slideshow component
import ContactUs from "./components/ContactUs"; // Import the Contact Us component
import aboutImage from "./images/about-us.jpg"; // Import the image

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="navbar">
            <Link to="home" smooth={true} duration={500}>בית🐝</Link>
            <Link to="products" smooth={true} duration={500}>מוצרים🍯</Link>
            <Link to="about" smooth={true} duration={500}>קצת עלינו🌸</Link>
            <Link to="contact" smooth={true} duration={500}>צרו קשר🧇</Link>
            <Link to="cart" smooth={true} duration={500}>עגלה🛒</Link>
          </div>
          <h1 className="header-title">דבש האילן</h1>
        </div>
      </header>
      <main>
        <Slideshow /> {/* Add the Slideshow component here */}
        <Element name="products">
          <ProductList /> {/* ProductList Component */}
        </Element>
        <Element name="about">
          <div className="AboutUs">
            <h2>קצת עלינו</h2>
            <img src={aboutImage} alt="About Us" className="about-image" />{" "}
            {/* Image */}
            <p>
              עלינו: אצלנו במושב אליקים, תהנו מדבש איכותי וטהור, שלא עבר חימום או
              עיבוד, הישר מפרחי הבר של המרחב הביוספרי של רמות מנשה. הדבש שלנו נאסף
              בקפידה מהפרחים הפראיים שמסביבנו, מה שמבטיח את הטעמים העשירים
              והטבעיים ביותר. המתיקות והאיכות של הדבש שלנו מגיעות מהשדה ישירות
              אליכם, עם דגש על שמירה על תהליך פשוט וטבעי. כל בקבוק דבש מהחווה שלנו
              משקף את האופי הייחודי של אזור רמות מנשה ואת האהבה שלנו לייצור דבש
              איכותי. אנו משפחה קטנה ומסורה שמחויבת להביא לכם דבש איכותי ובלתי
              מעורבב, ולתמוך בקיימות ותחזוקה טבעית של הכוורות שלנו.
            </p>
          </div>
        </Element>
        <Element name="contact">
          <ContactUs /> {/* Contact Us Component */}
        </Element>
      </main>
    </div>
  );
}

export default App;
