// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './css/ProductList.css'; // Ensure the correct path to CSS file

// Custom styles for the honey-themed dialog
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#fff7e6', // Light honey background color
    borderRadius: '16px', // Rounded corners to mimic a honeycomb shape
    border: '2px solid #f5b61f', // Honey yellow border
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  color: '#f5b61f', // Honey yellow color
  textAlign: 'center',
  fontWeight: 'bold',
});

const StyledDialogContent = styled(DialogContent)({
  color: '#4d3300', // Dark brown text to resemble honeycomb
  textAlign: 'center',
  padding: '20px',
});

const StyledDialogActions = styled(DialogActions)({
  justifyContent: 'center',
  padding: '10px 0',
});

const StyledButton = styled(Button)({
  backgroundColor: '#f5b61f', // Honey yellow button color
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e4a01f', // Darker honey color on hover
  },
  margin: '0 10px',
  padding: '10px 20px',
  borderRadius: '8px', // Rounded button for a soft look
});

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

  const handlePopupClose = () => {
    setPopup(null);
  };

  const handleOptionSelect = (option) => {
    if (popup) {
      if (option === 'לתשלום') {
        console.log(`Proceeding to checkout for ${popup.name}`);
      } else if (option === 'הוספה לעגלה') {
        console.log(`Added ${popup.name} to the cart`);
      }
      handlePopupClose(); // Close the popup after selection
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
            <Button variant="contained" color="primary" onClick={() => handlePopupOpen(product)}>
              קנה עכשיו
            </Button>
            <StyledDialog
              open={popup?.id === product.id}
              onClose={handlePopupClose}
              aria-labelledby="popup-dialog-title"
              aria-describedby="popup-dialog-description"
            >
              <StyledDialogTitle id="popup-dialog-title">
                בחר פעולה
              </StyledDialogTitle>
              <StyledDialogContent>
                <DialogContentText id="popup-dialog-description">
                  אנא בחר פעולה עבור {popup?.name}
                </DialogContentText>
              </StyledDialogContent>
              <StyledDialogActions>
                <StyledButton onClick={() => handleOptionSelect('לתשלום')}>
                  לתשלום
                </StyledButton>
                <StyledButton onClick={() => handleOptionSelect('הוספה לעגלה')}>
                  הוספה לעגלה
                </StyledButton>
              </StyledDialogActions>
            </StyledDialog>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductList;
