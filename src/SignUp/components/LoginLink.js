import React from 'react';
import { Link } from 'react-router-dom';

function LoginLink() {
  return (
    <div>
      <Link to="/login">Log in</Link>
    </div>
  );
}

export default LoginLink;
