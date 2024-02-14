import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './App/components/LoginForm'; // Import the LoginForm component
import SignUpForm from './SignUp/components/SignUpForm'; // Import the SignUpForm component
import HomePageApp from './HomePage/HomePageApp';

function FirstScreen() {
    return (
        <Router>
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePageApp />} />
        </Routes>
      </Router>
    );
}

export default FirstScreen;