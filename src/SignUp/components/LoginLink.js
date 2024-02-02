import React, { useState } from 'react';
import './LoginLink.css'

function LoginLink({ onLoginClick }) {
  return (
    <div>
      <p className="login-link">Already have an account? <a href="#" onClick={onLoginClick}>Log in</a></p>
    </div>
  );
}

export default LoginLink;