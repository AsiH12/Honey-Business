import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For redirecting
import "./NotFoundPage.css"; // Import the CSS file

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <Typography
        variant="h1"
        className="not-found-title"
      >
        אופס! העמוד אינו נמצא!
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        className="redirect-button"
      >
        נסו לחזור בחזרה
      </Button>
    </div>
  );
}

export default NotFoundPage;
