import React, { useState } from 'react';
import SignUp from '../../SignUp/SignUp'; // Import the SignUp component

function SignUpLink() {
  const [showSignUp, setShowSignUp] = useState(false); // State to toggle sign-up screen

  const handleSignupClick = () => {
    setShowSignUp(true); // Show the sign-up screen
  };

  return (
    <div>
      {showSignUp ? (
        <SignUp />
      ) : (
        <a href="#" className="signup-link" onClick={handleSignupClick}>Sign up</a>
      )}
    </div>
  );
}

export default SignUpLink;

