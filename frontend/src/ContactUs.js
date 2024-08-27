import React from 'react';
import './ContactUs.css'; // Import CSS file for styling

const contactFormStyle = {
  fontFamily: 'Roboto, sans-serif', // Applying the new font
};

function ContactUs() {
  return (
    <div className="ContactUs" style={contactFormStyle}>
      <h2>צרו קשר</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">שם:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="שם מלא"
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">דוא"ל:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="אימייל"
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">הודעה:</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            placeholder="הודעה"
            required
          ></textarea>
        </div>
        <button type="submit">שלח</button>
      </form>
    </div>
  );
}

export default ContactUs;
