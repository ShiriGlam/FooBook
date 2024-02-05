import React from 'react';
import './Rightmenu.css';
import logo from './facebook_logo.png';

function RightMenu({ darkMode, toggleDarkMode }) {
  const handleModeToggle = () => {
    toggleDarkMode();
  };

  return (
    <aside className={`right-menu ${darkMode ? 'dark-mode' : ''}`}>
      <img src={logo} alt="Facebook Logo" className="logo" />
      <ul>
        <li>Profile</li>
        <li>Posts</li>
        <li>Friends</li>
        <li>Groups</li>
      </ul>
      <button className="mode-toggle" onClick={handleModeToggle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </aside>
  );
}

export default RightMenu;
