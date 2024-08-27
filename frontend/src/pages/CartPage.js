import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();

  // Function to handle checkout
  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to checkout page if needed
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {/* Display cart items here */}
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;
