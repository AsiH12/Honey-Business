import React, { useState } from "react";
import { useCart } from "../CartContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders/create/",
        {
          items: cartItems.map((item) => ({
            product: item.id,
            quantity: item.quantity,
          })),
          total_price: getTotalPrice(),
          created_at: new Date().toISOString(), // Add created_at field
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setConfirmationDialogOpen(true);
        clearCart(); // Clear the cart
        setLoading(false);
        setTimeout(() => {
          navigate("/"); // Redirect to homepage after 2 seconds
        }, 2000);
      } else {
        console.error("Failed to place order");
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while placing the order", error);
      setLoading(false);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
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
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
        className="confirmation-dialog"
      >
        <DialogTitle id="confirmation-dialog-title">ההזמנה אושרה!</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            הדבש הטרי שלנו בדרך אלייך!{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default CartPage;
