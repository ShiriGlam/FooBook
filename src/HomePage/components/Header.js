// Header.js

import React from 'react';
import './Header.css';
import logo from "./facebook_logo.png"
import Search from './Search'
function Header() {
  return (
    <header>
      <img src={logo} alt="Facebook Logo" className="logo" />
      <div className="logo">Facebook</div>
      <SecMenu />
    </header>
  
  );
}

function SecMenu() {
  return (
    <sec-menu>
      
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li>Friends</li>
      </ul>
    </sec-menu>
  );
}

export default Header;
