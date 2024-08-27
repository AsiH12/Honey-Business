import React from 'react';
import { useCart } from '../CartContext';
import './CartPage.css';

function CartPage() {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cart-page">
      <h1>עגלה שלך</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(item => {
            const price = Number(item.price); // Ensure price is a number

            return (
              <div key={item.id} className="cart-item">
                <img src={`http://localhost:8000${item.image_url}`} alt={item.name} />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p className="quantity">Quantity: {item.quantity}</p>
                  <p className="price">Price: ₪{price.toFixed(2)}</p>
                </div>
                <div className="cart-item-remove" onClick={() => handleRemove(item.id)}>
                  Remove
                </div>
              </div>
            );
          })}
          <div className="cart-total">
            <h2>Total: ₪{getTotalPrice().toFixed(2)}</h2>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;
