import React from 'react';
import './SubmitButton.css'
function SubmitButton({ text }) {
  return (
    <button type="submit" className="login-button">{text}</button>
  );
}

export default SubmitButton;