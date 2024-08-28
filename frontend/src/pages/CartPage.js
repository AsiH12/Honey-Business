import React from "react";
import { useCart } from "../CartContext";
import Button from "@mui/material/Button"; // Import MUI Button
import "./CartPage.css"; // Ensure this file contains styles for the cart page

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    // Logic to handle checkout, like navigating to the checkout page
    console.log("Proceeding to checkout...");
  };

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
          <Button
            className="checkout-button"
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            style={{ backgroundColor: "#f5b61f", color: "#fff", width: "100%" }}
          >
            לתשלום
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
