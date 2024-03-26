import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './App/components/LoginForm';
import SignUpForm from './SignUp/components/SignUpForm'; 
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