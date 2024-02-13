import React, { useState } from 'react';
import SignupLink from './SignUpLink.js';
import './CreateAccount.css'


function CreateAccount() {
  return (
    <div className="create-account">
      Don't have an account? <SignupLink />
    </div>
  );
}



export default CreateAccount;