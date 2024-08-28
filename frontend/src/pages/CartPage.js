import React from 'react';
import { useCart } from '../CartContext';
import './CartPage.css'; // Ensure this file contains styles for the cart page

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="cart-page">
      <h1>עגלה</h1>
      {cartItems.length === 0 ? (
        <p>העגלה ריקה</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img 
                src={`http://localhost:8000${item.image_url}`} 
                alt={item.name} 
                className="cart-item-image" 
              />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>מחיר: ₪{item.price}</p>
                <p>כמות: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>הסר</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h2>סך הכל: ₪{getTotalPrice()}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
