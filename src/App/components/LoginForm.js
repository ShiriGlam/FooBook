
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from './Logo';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import Divider from './Divider';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password');
     return;
    }

    // Directly navigate to the home page upon successful login
    window.location.href = `/home/${username}`;
  };

  return (
    <div className="login-box">
      <Logo />
      <h2 className="title">Log into Facebook</h2>
      <form onSubmit={handleLogin}>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(newValue) => setUsername(newValue)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(newValue) => setPassword(newValue)}
        />
        { }
        <SubmitButton text="Log In" />
      </form>
      <ForgotPassword />
      <Divider />
      <CreateAccount />
    </div>
  );
}

export default LoginForm;
