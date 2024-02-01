// RightMenu.js
import './Rightmenu.css';
import React from 'react';

function RightMenu() {
  return (
    <aside className="right-menu">
      <img src="facebook_logo.png" alt="Facebook Logo" className="logo" />
      <ul>
        <li>Profile</li>
        <li>Posts</li>
        <li>Friends</li>
        <li>Groups</li>
      </ul>
      <button className="mode-toggle">Dark Mode</button>
    </aside>
  );
}

export default RightMenu;
