// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ProductList.css'; // Ensure the correct path to CSS file

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null); // To manage popup state

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the products.');
        setLoading(false);
      });
  }, []);

  const handlePopupOpen = (product) => {
    setPopup(product);
  };

  const handleOptionSelect = (option) => {
    if (popup) {
      if (option === 'לתשלום') {
        console.log(`Proceeding to checkout for ${popup.name}`);
      } else if (option === 'הוספה לעגלה') {
        console.log(`Added ${popup.name} to the cart`);
      }
      setPopup(null); // Close the popup after selection
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <img src={`http://localhost:8000${product.image_url}`} alt={product.name} />
            <p>מחיר: ₪{product.price}</p>
            <button className="buy-now-button" onClick={() => handlePopupOpen(product)}>
              קנה עכשיו
            </button>
            {popup && popup.id === product.id && (
              <div className="popup-menu">
                <button onClick={() => handleOptionSelect('לתשלום')}>לתשלום</button>
                <button onClick={() => handleOptionSelect('הוספה לעגלה')}>הוספה לעגלה</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
