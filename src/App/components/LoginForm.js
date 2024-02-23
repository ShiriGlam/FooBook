
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from './Logo';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import Divider from './Divider';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // Store JWT token in HTTP-only cookie
      document.cookie = `token=${data.token}; path=/;`;
      
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('An error occurred while logging in. Please try again.');
    }
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
