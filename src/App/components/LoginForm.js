// LoginForm.js
import React from 'react';
import Logo from './Logo';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import Divider from './Divider';
import './LoginForm.css'
function LoginForm() {
  return (
    <div className="login-box">
      <Logo />
      <h2 className="title">Log into Facebook</h2>
      <form>
        <InputField type="email" placeholder="Email address" />
        <InputField type="password" placeholder="Password" />
        <SubmitButton text="Log In" />
      </form>
      <ForgotPassword />
      <Divider />
      <CreateAccount />
    </div>
  );
}

export default LoginForm;