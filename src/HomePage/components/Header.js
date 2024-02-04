// Header.js

import React from 'react';
import './Header.css';
function Header() {
  return (
    <header>
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
        <li>Groups</li>
      </ul>
    </sec-menu>
  );
}

export default Header;
