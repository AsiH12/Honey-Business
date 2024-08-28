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
import { useCart } from '../CartContext';
import './css/ProductList.css';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#fff7e6',
    borderRadius: '16px',
    border: '2px solid #f5b61f',
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  color: '#f5b61f',
  textAlign: 'center',
  fontWeight: 'bold',
});

const StyledDialogContent = styled(DialogContent)({
  color: '#4d3300',
  textAlign: 'center',
  padding: '20px',
});

const StyledDialogActions = styled(DialogActions)({
  justifyContent: 'center',
  padding: '10px 0',
});

const StyledButton = styled(Button)({
  backgroundColor: '#f5b61f',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e4a01f',
  },
  margin: '0 10px',
  padding: '10px 20px',
  borderRadius: '8px',
});

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true; // To track if component is mounted

    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        if (isMounted) {
          setProducts(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError('There was an error fetching the products.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Cleanup on unmount
    };
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
        addToCart(popup);
        console.log(`Added ${popup.name} to the cart`);
      }
      handlePopupClose();
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
