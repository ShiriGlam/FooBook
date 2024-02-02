import React, { useState } from 'react';
import SignupLink from './SignUpLink.js';
import './CreateAccount.css'


function CreateAccount() {
  return (
    <p className="create-account">Don't have an account? <SignupLink /></p>
  );
}



export default CreateAccount;